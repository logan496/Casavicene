const request = require('supertest')
const faker = require('faker')
const httpStatus = require('http-status')
const httpMocks = require('node-mocks-http')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const app = require('../../../src/app')
const config = require('../../../src/config/config')
const auth = require('../../../src/middleware/auth.middleware')
const {tokenService, emailService} = require('../../../src/services')
const ApiError = require('../../../src/utils/ApiError')
const setupTestDB = require('../../setup/setupTestDB')
const {User, Token} = require('../../../src/models')
const {roleRights} = require('../../../src/config/userRoles')
const {tokenTypes} = require('../../../src/config/tokens')
const {userOne, admin, insertUsers} = require('../../fixtures/user.fixture')
const {userOneAccessToken, adminAccessToken} = require('../../fixtures/token.fixture')
const { token } = require('morgan');
const jest = require('mocha/lib/runnable');

setupTestDB()

describe('Auth routes', () =>  {
    describe('POST /Service-user/auth/register', () => {
        let newUser
        beforeEach(() => {
            newUser = {
                name: faker.name.findName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password1'
            }
        })

        test('should return 201 and successfully registeruser if request data is ok', async () => {
            const res = await request(app).post('/Service-user/auth/register').send(newUser).expect(httpStatus.CREATED)

            expect(res.body.user).not.toHaveProperty('password')
            expect(res.body.user).toEqual({id: expect.anything(), name: newUser.name, email: newUser.email, role: 'user'})

            const dbUser = await User.findById(res.body.user.id)
            expect(dbUser).toBeDefined()
            expect(dbUser.password).not.toBe(newUser.password)
            expect(dbUser).toMatchObject({name: newUser.name, email: newUser.email, role: 'user'})

            expect(res.body.tokens).toEqual({
                access: {token: expect.anything(), expires: expect.anything()},
                refresh: {token: expect.anything(), expires: expect.anything()}
            })
        })

        test('should return 400 error if email is invalid', async () => {
            newUser.email = 'invalidEmail'

            const res = await request(app).post('/Service-user/auth/register')
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)

        })

        test('should return 400 error if email is already used', async() => {
            await insertUsers([userOne])

            newUser.email = userOne.email
            const res = await request(app).post('/Service-user/auth/register')
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 400 if length of the password is less than 8', async () => {
            newUser.password = 'invalid'

            const res = await request(app).post('/Service-user/auth/register')
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 400 if password not contains both letter and numbers', async () => {
            newUser.password = 'password'

            await request(app).post('/Service-user/auth/register')
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)

            newUser.password =  '12345678'

            await request(app).post('/Service-user/auth/register')
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })
    })
    describe('POST /Service-user/auth/login', () => {
        test('should return 200 and login user if email and password match', async () => {
            await insertUsers([userOne])
            const loginCredentials = {
                email: userOne.email,
                password: userOne.password
            }

            const res = await request(app)
                .post('/Service-user/auth/login')
                .send(loginCredentials)
                .expect(httpStatus.OK)

            expect(res.body.user).toEqual({
                id: expect.anything(),
                name: userOne.name,
                email: userOne.email,
                role: userOne.role
            })

            expect(res.body.tokens).toEqual({
                acces: {token: expect.anything(), expires: expect.anything()},
                refresh: {token: expect.anything(), expires: expect.anything()}
            })
        })

        test('should return 401 error if there are no users with that email', async () => {
            const loginCredentials = {
                email: userOne.email,
                password: userOne.password
            }

            const res = await request(app)
                .post('/Service-user/auth/login')
                .send(loginCredentials)
                .expect(httpStatus.UNAUTHORIZED)

            expect(res.body).toEqual({
                code: httpStatus.UNAUTHORIZED,
                message: 'Wrong Email, No user found for that email'
            })

            test('should return 401 if email or password are wrong', async () => {
                await insertUsers([userOne])
                const loginCredentials = {
                    email: userOne.email,
                    password: "wrongPassword1"
                }

                const res = await request(app)
                    .post('/Service-user/auth/login')
                    .send(loginCredentials)
                    .expect(httpStatus.UNAUTHORIZED)

                expect(res.body).toEqual({
                    code: httpStatus.UNAUTHORIZED,
                    message: 'Email or password incorrect'
                })
            })
        })

        describe('POST /Service-user/auth/logout', () => {
            test('should return 201 if refresh token is valid', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays, 'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH)
                await tokenService.saveToken(refreshToken, userOne._id, expires, tokenTypes.REFRESH)

                await request(app).post('/Service-user/auth/logout').send({refreshToken}).expect(httpStatus.NO_CONTENT)

                const dbRefreshTokenDoc = await Token.findOne({token: refreshToken})
                expect(dbRefreshTokenDoc).toBe(null)
            })

            test('should return 400 error if refresh token is missing from request body', async () => {
                await request(app).post('/Service-user/auth/logout').send().expect(httpStatus.BAD_REQUEST)
            })

            test('should return 404 if token is not found in the database', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays, 'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH)

                await request(app).post('/Service-user/auth/logout').send({refreshToken}).expect(httpStatus.NOT_FOUND)
            })

            test('should return 404 error if refresh token is blacklisted', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays, 'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, tokenService.REFRESH)
                await tokenService.saveToken(refreshToken, userOne._id, expires, tokenService.REFRESH, true)

                await request(app)
                  .post('/Service-user/auth/logout')
                  .send({refreshToken})
                  .expect(httpStatus.NOT_FOUND)

            })
        })

        describe('POST /Service-user/auth/refresh-tokens', () => {
            test('should return 200 and new auth tokens if refresh token is valid', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays, 'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, tokenService.REFRESH)
                await tokenService.saveToken(refreshToken, userOne._id, expires, tokenService.REFRESH)

                await request(app)
                  .post('/Service-user/auth/refresh-tokens')
                  .send({refreshToken})
                  .expect(httpStatus.OK)

                expect(req.body).toEqual({
                    access: {token: expect.anything(),expires: expect.anything()},
                    refresh: {token: expect.anything(), expires: expect.anything()}
                })

                const dbRefreshTokenDoc = await Token.findOne({token: res.body.refresh.token})
                expect(dbRefreshTokenDoc).toMatchObject({type: tokenTypes.REFRESH, user: userOne._id, blacklisted: false})

                const dbRefreshTokenCount = await Token.countDocuments()
                expect(dbRefreshTokenCount).toBe(1)
            })

            test('should return 400 error if refresh token is missing from request body', async () => {
                await request(app)
                  .post('/Service-user/auth/refresh-tokens')
                  .send()
                  .expect(httpStatus.BAD_REQUEST)
            })

            test('should return 401 error if refresh token is signed using an invalid secret', async () =>   {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays, 'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, token.REFRESH, 'invalidSecret')
                await tokenService.saveToken(refreshToken, userOne._id, expires, token.REFRESH)

                await request(app)
                  .post('/Service-user/auth/refresh-tokens')
                  .send({tokenService})
                  .expect(httpStatus.UNAUTHORIZED)
            })

            test('should return 401 error if refresh token is not found in the database', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays,'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, token.REFRESH)
                await tokenService.saveToken(refreshToken, userOne._id, expires, token.REFRESH)

                await request(app)
                  .post('/Service-user/auth/refresh-tokens')
                  .send({tokenService})
                  .expect(httpStatus.UNAUTHORIZED)
            })

            test('should return 401 error if refresh token is blacklisted', async () =>  {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.refreshExpirationDays, 'days')
                const refreshToken = tokenService.generateToken(userOne._id, expires, token.REFRESH)
                await tokenService.saveToken(refreshToken, userOne._id, expires, token.REFRESH, true)

                await request(app)
                  .post('/Service-user/auth/refresh-tokens')
                  .send({tokenService})
                  .expect(httpStatus.UNAUTHORIZED)
            })

            test('should return 401 error if refresh token is expired', async () => {
                await insertUsers([userOne])
                const expires = moment().subtract(1, 'minutes')
                const refreshToken = tokenService.generateToken(userOne._id, expires)
                await tokenService.saveToken(refreshToken, userOne._id, expires, token.REFRESH)

                await request(app)
                  .post('/Service-user/auth/refresh-tokens')
                  .send({tokenService})
                  .expect(httpStatus.UNAUTHORIZED)
            })
        })
        describe('POST /Service-user/auth/forgot-password', () => {
            beforeEach(() => {
                jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue()
            })

            test('should return 204 and send rest password email to the user', async () => {
                await insertUsers([userOne])
                const sendResetPasswordEmailSpy = jest.spyOn(emailService, 'sendResetPasswordEmail')

                await request(app)
                  .post('/Service-user/auth/forgot-password')
                  .send({email: userOne.email})
                  .expect(httpStatus.NO_CONTENT)

                expect(sendResetPasswordEmailSpy).toHaveBeenCalledWith(userOne.email, expect.any(String))
                const resetPasswordToken = sendResetPasswordEmailSpy.mock.calls[0][1]
                const dbResetPasswordTokenDoc = await Token.findOne({token: resetPasswordToken, user: userOne._id })
                expect(dbResetPasswordTokenDoc).toBeDefined()
            })

            test('should return 400 if email is missing', async() => {
                await insertUsers([userOne])

                await request(app)
                  .post('/Service-user/auth/forgot-password')
                  .send()
                  .expect(httpStatus.BAD_REQUEST)
            })

            test('should return 404 if email does not belong to any user', async () => {
                await request(app)
                  .post('/Service-user/auth/forgot-password')
                  .send({email: userOne.email })
                  .expect(httpStatus.NOT_FOUND)
            })
        })
        describe('POST /Service-user/auth/reset-password', () => {
            test('should return 2O4 and reset the password', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
                const resetPasswordToken = tokenService.generateToken(userOne._id, expires, tokenTypes.RESET_PASSWORD)

                await tokenService.saveToken(resetPasswordToken, userOne._id, expires, tokenTypes.RESET_PASSWORD)

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({token: resetPasswordToken})
                  .send({password:'password2'})
                  .expect(httpStatus.NO_CONTENT)

                const dbUser = await User.findById(userOne._id)
                const isPasswordMatch = await bcrypt.compare('password2', dbUser.password)
                expect(isPasswordMatch).toBe(true)

                const dbResetPasswordTokenCount = await Token.countDocuments({user: userOne._id, type: tokenTypes.RESET_PASSWORD})
                expect(dbResetPasswordTokenCount).toBe(0)
            })

            test('should return 400 if reset password token is missing', async () => {
                await insertUsers([userOne])

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .send({password: 'password2'})
                  .expect(httpStatus.BAD_REQUEST)
            })

            test('should return 401 if reset passsword token is blacklisted', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
                const resetPasswordToken = tokenService.generateToken(userOne._id, expires, tokenTypes.RESET_PASSWORD)
                await tokenService.saveToken(resetPasswordToken, userOne._id, expires, tokenTypes.RESET_PASSWORD, true)

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({token: resetPasswordToken})
                  .send({password: 'password2'})
                  .expect(httpStatus.UNAUTHORIZED)
            })

            test('should return 401 if reset password token is expired', async () =>  {
                await insertUsers([userOne])
                const expires = moment().subtract(1, 'minutes')
                const resetPasswordToken = tokenService.generateToken(userOne._id, expires, tokenTypes.RESET_PASSWORD)
                await tokenService.saveToken(resetPasswordToken, userOne._id, expires, tokenTypes.RESET_PASSWORD)

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({token: resetPasswordToken})
                  .send({password: 'password2'})
                  .expect(httpStatus.UNAUTHORIZED)
            })

            test('should return 401 if user is not found', async () => {
                const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
                const resetPasswordTaken = tokenService.generateToken(userOne._id, expires, tokenTypes.RESET_PASSWORD)
                await tokenService.saveToken(resetPasswordTaken, userOne._id, expires, tokenTypes.RESET_PASSWORD)

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({token: resetPasswordToken})
                  .send({password: 'password2'})
                  .expect(httpStatus.UNAUTHORIZED)

            })

            test('should return 400 if password is missing or invalid', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
                const resetPasswordToken = tokenService.generateToken(userOne._id, expires, tokenTypes.RESET_PASSWORD)
                await tokenService.saveToken(resetPasswordToken, userOne._id, expires, tokenTypes.RESET_PASSWORD)

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({ token: resetPasswordToken })
                  .expect(httpStatus.BAD_REQUEST);

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({ token: resetPasswordToken })
                  .send({ password: 'short1' })
                  .expect(httpStatus.BAD_REQUEST);

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({ token: resetPasswordToken })
                  .send({ password: 'password' })
                  .expect(httpStatus.BAD_REQUEST);

                await request(app)
                  .post('/Service-user/auth/reset-password')
                  .query({ token: resetPasswordToken })
                  .send({ password: '11111111' })
                  .expect(httpStatus.BAD_REQUEST);

            })
        })

        describe('Auth middleware',() => {
            test('should call next with no errors if access token is valid', async () => {
                await insertUsers([userOne])
                const req = httpMocks.createRequest({headers: {authorization: `Bearer ${userOneAccessToken}`}})
                const next = jest.fn()

                await auth()(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith(expect.any(ApiError))
                expect(next).toHaveBeenCalledWith(
                  expect.objectContaining({statusCode: httpStatus.UNAUTHORIZED, messae: 'Please authenticate'})
                )
            })

            test('should call next with unauthorizad error if access is not a valid jwt token', async () => {
                await insertUsers([userOne])
                const req = httpMocks.createRequest({headers: {Authorization: `Bearer randomToken`}})
                const next = jest.fn()

                await auth()(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith(expect.any(ApiError))
                expect(next).toHaveBeenCalledWith(
                  expect.objectContaining({statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate'})
                )
            })

            test('should call next with unauthorize if the token isn\'t access token', async () =>  {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
                const refreshToken = tokenService.generateTokrn(userOne._id, expires, tokenTypes.REFRESH)
                const req = httpMocks.createRequest({headers: {Authorization: `Bearer ${refreshToken}`}})
                const next = jest.fn()

                await auth()(req, httpMocks.createResponse(),next)

                expect(next).toHaveBeenCalledWith(expect.any(ApiError))
                expect(next).toHaveBeenCalledWith(
                  expect.objectContaining({statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate'})
                )
            })

            test('should call next with unauthorized error if access token is generated with an invalid secret', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
                const accessToken = tokenService.generateToken(userOne._id, expires, tokenTypes.ACCESS)
                const req = httpMocks.createRequest({headers: {Authorization: `Bearer ${accessToken}`}})

                const next = jest.fn()

                await auth()(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith(expect.any(ApiError))
                expect(next).toHaveBeenCalledWith(
                  expect.objectContaining({statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate'})
                )
            })

            test('should call next with unauthorized error if access token is generated with an invalid secret', async () => {
                await insertUsers([userOne])
                const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
                const accessToken = tokenService.generateToken(userOne._id, expires, tokenTypes.ACCESS, 'invalidSecret')
                const req = httpMocks.createRequest({headers: {Authorization: `Bearer ${accessToken}`}})
                const next = jest.fn()

                await auth()(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith(expect.any(ApiError))
                expect(next).toHaveBeenCalledWith(
                  expect.objectContaining({statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate'})
                )
            })

            test('should call next with unauthorized error if access token is expired', async () => {
                await insertUsers([userOne])
                const expires = moment().subtract(1, 'minutes')
                const accessToken = tokenService.generateToken(userOne._id, expires, tokenTypes.ACCESS)
                const req = httpMocks.createRequest({headers: {Authorization: `Bearer ${accessToken}`}})
                const next = jest.fn()

                await auth()(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith(expect.any(ApiError))
                expect(next).toHaveBeenCalledWith(
                  expect.objectContaining({statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate'})
                )
            })

            test('should call next with no errors if user does not have required rights but userId is in params', async () => {
                await insertUsers([userOne])
                const req = httpMocks.createRequest({
                    headers: {
                        Authorization: `Bearer ${userOneAccessToken}`
                    },
                    params: {
                        userId: userOne._id.toHexString()
                    }
                })
                const next = jest.fn()

                await auth('anyRight')(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith()
            })

            test('should call next with no erros if user has required rights', async () =>  {
                await inserUsers( [admin])
                const req = httpMocks.createRequest({
                    headers: {
                        Authorization: `Bearer ${adminAccessToken}`
                    },
                    params: {
                        userId: userOne._id.toHexString()
                    }
                })

                const next = jest.fn()

                await auth(...roleRights.get('admin'))(req, httpMocks.createResponse(), next)

                expect(next).toHaveBeenCalledWith()
            })
        })
    })
})