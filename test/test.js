const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // Adjust the path as needed
const User = require('../models/auth');
const should = chai.should();

chai.use(chaiHttp);

describe('User Controller', () => {
    // Clean up the database before each test
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    describe('/GET user/:id', () => {
        it('it should GET a user by the given id', async () => {
            const user = new User({ name: "Test User", email: "test@example.com" });
            await user.save();

            chai.request(server)
                .get(`/users/${user._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    describe('/DELETE user/:id', () => {
        it('it should DELETE a user given the id', async () => {
            const user = new User({ name: "Test User", email: "test@example.com" });
            await user.save();

            chai.request(server)
                .delete(`/users/${user._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/PUT user/:id', () => {
        it('it should UPDATE a user given the id', async () => {
            const user = new User({ name: "Test User", email: "test@example.com" });
            await user.save();

            chai.request(server)
                .put(`/users/${user._id}`)
                .send({ name: "Updated Test User" })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
