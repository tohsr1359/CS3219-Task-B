let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("contacts", () => {
    describe("GET /", () => {
        // Test to get all contacts record
        it("should get all contacts record", (done) => {
             chai.request(app)
                 .get('/api/contacts')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });    
    });

    describe('POST /', () => {
        it('should post a contact record', (done) => {
            let contact = {
                name: "ABC",
                email: "abc@gmail.com",
                gender: "Male",
                phone: "123"
            }
          chai.request(app)
              .post('/api/contacts')
              .send(contact)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('gender');
                    res.body.data.should.have.property('phone');
                done();
              });
        });
    });

    describe('PUT/:id contact', () => {
        it('should update a contact record', (done) => {
            let contact = new Contact({name: "hello", email: "cs@hello.com", gender: "Female", phone: "778"})
            contact.save((err, contact) => {
                  chai.request(app)
                  .put('/api/contacts/' + contact.id)
                  .send({name: "goodbye", email: "cccsss@hello.com", gender: "Male", phone: "778888"})
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact Info updated');
                        res.body.data.should.have.property('name').eql("goodbye");
                        res.body.data.should.have.property('email').eql("cccsss@hello.com");
                        res.body.data.should.have.property('gender').eql("Male");
                        res.body.data.should.have.property('phone').eql("778888");                        
                        done();
                  });
            });
        });
    });
    
    describe('DELETE/:id contact', () => {
        it('should delete a contact record', (done) => {
            let contact = new Contact({name: "goodbye", email: "cccsss@hello.com", gender: "Male", phone: "778888"})
            contact.save((err, contact) => {
                  chai.request(app)
                  .delete('/api/contacts/' + contact.id)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact deleted');
                    done();
                  });
            });
        });
    });
});