var test = require('supertest')
var app = require("../app")
var chaiHttp = require("chai-http")
var chai = require("chai")
var assert = require('assert');

chai.use(chaiHttp)

describe("GET map/get-marks without auth",()=>{
    it("Should be 401 error",(done)=>{
        chai.request(app)
        .get("/map/get-marks").then(val => {
            console.log(val);
            assert.equal(val.status,401);
            done();
        })      
    })
})


describe("GET map/get-marks",()=>{
    it("Should be list of marks",(done)=>{
        let testuser = {
            login:"test",
            password:"test"
        };

        chai.request(app).post("/auth/login").send(testuser).then(res=>{
            console.log(res.body);
            assert.equal(res.status,200);
            
            chai.request(app)
            .get("/map/get-marks").then(val => {
                assert.equal(val.status,200);
                assert.equal(Array.isArray(val.body.marks),true);
                done();
            })      
        });
        

    })
})

describe("POST /map/add-mark", () =>{
    it('it should POST a mark', (done) => {
        let mark = {
            longitude: 10,
            latitude: 20,
            name: "test mark"
        };

        chai.request(app)
            .post('/map/add-mark')
            .send(mark)
            .end((err, res) => {   
                assert.equal(res.status,200)
                chai.request(app).get("/map/get-marks").then(val=>{
                    assert.equal(val.body.marks.includes(mark),true);
                    done();
                })
                
            });
      });
})

describe("POST /map/delete-mark", () =>{
    it('it should POST a mark', (done) => {
        
        chai.request(app)
            .post('/map/delete-mark')
            .send({name:"test mark"})
            .end((err, res) => {   
                assert.equal(res.status,200)
                chai.request(app).get("/map/get-marks").then(val=>{
                    assert.equal(val.body.marks.includes(mark),false);
                    done();
                })
                
            });
      });
})