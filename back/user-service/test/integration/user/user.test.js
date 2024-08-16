const request = require('supertest')
const faker = require('faker')
const httpStatus = require('http-status')
const setupTestDB = require('../../setup/setupTestDB')
const {User} = require('../../../src/models')
const {userOne, userTwo, admin, insertUsers} = require('../../fixtures/user.fixture')
const {userOneAccessToken, adminAccessToken} = require('../../fixtures/token.fixture')
const app = require('../../../src/app')

setupTestDB()

describe('User routes', () =>  {
    describe('POST /Service-user/users', () => {
        let newUser

        beforeEach(() =>  {
            newUser =  {
                name: faker.name.findName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password1',
                role: 'user',
            }
        })

        test('should return 201 and successfully create new user if data is ok', async() => {
            await insertUsers([admin])

            const res = await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.CREATED)

            expect(res.body)._not.toHaveProperty('password')
            expect(res.body).toEqual({id: expect.anything(), name: newUser.name, email: newUser.email, role: newUser.role})

            const dbUser = await User.findById(res.body.id)
            expect(dbUser).toBeDefined()
            expect(dbUser.password)._not.toBe(newUser.password)
            expect(dbUser).toMatchObject({name: newUser.name, email: newUser.email, role: newUser.role})
        })

        test('should be abel to create admin as well', async () => {
            await insertUsers([admin])
            newUser.role = 'admin'

            const res = await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.CREATED)

            expect(res.body.role).toBe('admin')

            const dbUser = await User.findById(res.body.id)
            expect(dbUser.role).toBe('admin')
        })

        test('should return 401 error if access token is missing', async () => {
            await request(app).post('/Service-user/users').send(newUser).expect(httpStatus.UNAUTHORIZED)
        })

        test('should return 403 error if logged in user is not admin', async () => {
            await insertUsers([userOne])

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `bearer ${userOneAccessToken}`)
                .send(newUser)
                .expect(httpStatus.FORBIDDEN)
        })

        test('should return 400 error if email is invalid', async () => {
            await insertUsers([admin])
            newUser.email = 'invalidEmail'

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 400 error if email is already used', async () => {
            await insertUsers([admin, userOne])
            newUser.email = userOne.email

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 400 error if password lenght is less than 8 character', async () => {
            await insertUsers([admin])
            newUser.password = 'pass1'

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 400 error if password does not contain both letters and numbers', async() => {
            await insertUsers([admin])
            newUser.password = 'password'

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)

            newUser.password = '12345678'

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 400 error if role isn\'t admin, medecin, infirm, user', async () =>  {
            await insertUsers([admin])
            newUser.role = 'invalid'

            await request(app)
                .post('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST)
        })
    })

    describe('GET /Service-user/users', () => {
        test('should return 200 and apply the default query options', async () => {
            await insertUsers([userOne, userTwo, admin])
 re
            const res = await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                results: expect.any(Array),
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 3,
            })
            expect(res.body.results).toHaveLength(3)
            expect(res.body.results[0]).toEqual({
                id: userOne._id.toHexString(),
                name: userOne.name,
                email: userOne.email,
                role: userOne.role
            })
        })

        test('should return 401 if access token is missing', async () => {
            await insertUsers([userOne, userTwo, admin])

            await request(app)
                .get('/Service-user/users')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
        })

        test('should return 403 if a non-admin is trying to acess', async () => {
            await insertUsers([userOne, userTwo, admin])

            await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${userOneAccessToken}`)
                .send()
                .expect(httpStatus.FORBIDDEN)
        })

        test('should apply filter to name field', async () => {
            await insertUsers([userOne, userTwo, admin])

            await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .query({name: userOne.name})
                .send()
                .expect(httpStatus.OK)

            expect(res.body).toEqual({
                results: expect.any(Array),
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 1
            })
            expect(res.body.results).toHaveLength(1)
            expect(res.body.results[0].id).toBe(userOne._id.toHexString())
        })

        test('should correctly apply filter on role field', async () => {
            await insertUsers([userOne, userTwo, admin])

            const res = await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .query({role: 'user'})
                .send()
                .expect(httpStatus.OK)

            expect(res.body).toEqual({
                results: expect.any(Array),
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 2
            })
            expect(res.body.results).toHaveLength(2)
            expect(res.body.results[0].id).toBe(userOne._id.toHexString())
            expect(res.body.results[1].id).toBe(userTwo._id.toHexString())
        })

        test('should correctly sort the returned array if descending sort param is specified', async() => {
            await insertUsers([userOne, userTwo, admin])

            const res = await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .query({sortBy: 'role:desc'})
                .send()
                .expect(httpStatus.OK)

            expect(res.body).toEqual({
                results: expect.any(Array),
                page: 1,
                limit: 10,
                totalPage: 1,
                totalResults: 3,
            })
            expect(res.body.results).toHaveLength(3)
            expect(res.body.results[0].id).toBe(userOne._id.toHexString())
            expect(res.body.results[1].id).toBe(userTwo._id.toHexString())
            expect(res.body.results[2].id).toBe(admin._id.toHexString())
        })

        test('should correctly sort the returned array if ascending sort is param is specified', async() => {
            await insertUsers([userOne, userTwo, admin])

            const res = await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .query({sortBy: 'role:asc'})
                .expect(httpStatus.OK)

            expect(res.body).toEqual({
                results: expect.any(Array),
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 3
            })
            expect(res.body.results).toHaveLength(3)
            expect(res.body.result[0].id).toBe(admin._id.toHexString())
            expect(res.body.results[1].id).toBe(userOne._id.toHexString())
            expect(res.body.results[2].id).toBe(userTwo._id.toHexString())
        })

        test('should correctly sort the returned array if multiple sortin criteria are specified', async() =>  {
            await insertUsers([userOne, userTwo, admin])

            const res = await request(app)
                .get('/Service-user/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send()
                .expect(httpStatus.OK)

            expect(res.body).toEqual({
                results: expect.any(Array),
                page: 1,
                timit: 10,
                totalPages: 1,
                totalResults: 3,
            })
            expect(res.body.results).toHaveLength(3)

            const expectedOrder = [userOne, userTwo, admin].sort((a, b) => {
                if(a.role < b.role){
                    return 1
                }
                if(a.role > b.role){
                    return -1
                }
                return a.name < b.name ? -1 : 1
            })
            expectedOrder.forEach((user, index) =>  {
                expect(res.body.results[index].id).toBe(user._id.toHexString())

            })
        })
    })
})
