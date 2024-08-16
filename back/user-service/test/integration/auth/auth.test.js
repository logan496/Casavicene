const request = require('supertest')
const faer = require('faker')
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
const {userOne, admin, inserUsers} = require('../../fixtures/user.fixture')
const {userOneAccessToken, adminAccessToken} = require('../../fixtures/token.fixture')

setupTestDB()