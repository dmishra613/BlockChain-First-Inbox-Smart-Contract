const assert=require('assert');
const ganache=require('ganache-cli');
//Web3 instance
const Web3=require('Web3');
//Connect Web3 Instance to local network
const web3=new Web3(ganache.provider());
const {interface,bytecode}=require('../compile');   

let accounts;;
let inbox;
beforeEach(async()=>{
    //Get a list of accounts....
    //All every method for web3 is asynchronus in nature
    accounts=await web3.eth.getAccounts();
    //Use one of those accounts to deploy
    //the contract
    inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['Hi there!']})
    .send({from:accounts[0],gas:'1000000'})
    //inbox javascript object of smart contract and instance of a contract.
});
describe('Inbox',()=>{
    it('Deploys a contract',()=>{
        //console.log(accounts);
        //console.log(inbox);
        assert.ok(inbox.options.address);
    });
    it('has a default message',async()=>{
        const message=await inbox.methods.message().call();
        assert.equal(message,'Hi there!');
    });

    it('can change the message',async ()=>{
        await inbox.methods.SetMessage('bye').send({from:accounts[0]});
        const message=await inbox.methods.message().call();
        //console.log(message);
        assert.equal(message,'bye');
    })
});