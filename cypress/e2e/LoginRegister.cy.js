

beforeEach(()=>{
  cy.visit('http://localhost:5173')
})


function login(username,password) {
  cy.get("input[name='username']").type(username)
  cy.get("input[name='password']").type(password)
  cy.get("button").click()
}

describe('Login Page', () => {
  it('Should show error message if user is not found', () => {
    login("a","a")
    cy.get('div').should('exist').and('contain.text', "Username is not registered!");
  })

  it('Should show error message if password is wrong', () => {
    login("admin","a")
    cy.get('div').should('exist').and('contain.text', "Wrong password!");
  })
  
  it('Should logged in as admin',()=>{
    login("admin","admin")
    cy.url().should("include","/admin")
  })
  it('Should logged in as owner',()=>{
    login("malexander2","malexander2")
    cy.url().should("include","/owner")
  })
  it('Should logged in as customer',()=>{
    login("wwiffill1","wwiffill1")
    cy.url().should("include","/customer")
  })
})

function register(username,email,name,phoneNumber,password,role,confirmationPassword, checkTermAndConditions) {
  const fileName="ckw28502.jpg";
  cy.fixture(fileName).then(fileContent=>{
    cy.get("input[type='file']").attachFile({
      fileContent,
      fileName,
      mimeType: 'image/jpeg'
    })
  })
  cy.get("input[id='registerUsername']").type(username)
  cy.get("input[id='registerEmailAddress']").type(email)
  cy.get("input[id='registerName']").type(name)
  cy.get("input[id='registerPhoneNumber']").type(phoneNumber) 
  cy.get("input[id='registerPassword']").type(password) 
  cy.get("input[id='registerConfirmationPassword']").type(confirmationPassword) 
  cy.get(`input[value='${role}']`).click()
  if (checkTermAndConditions) {
    cy.get("input[id='t&c_Checkbox']").click()
    const acceptButton=cy.contains("button","ACCEPT")
    acceptButton.should("be.visible")
    acceptButton.click()
  }
  cy.contains("button","Register").click()

  
}

describe('Register Page',()=>{
  beforeEach(()=>{
    cy.contains('u', "Register here").click();
    cy.intercept('POST','http://localhost:8080/users',req=>{
      if (req.body.username!="admin") {
        req.reply({
          statusCode:201
        })
      }
    },).as("createUser") 
  })

  it('Should show error when there is an empty fields',()=>{
    cy.contains("button","Register").click()
    cy.get('div').should('exist').and('contain.text', "There is an empty field!");
  })

  it('Should show error when phone number is invalid',()=>{
    register("owner","ckw28502@gmail.com","owner","111","a","OWNER","a",false)
    cy.get('div').should('exist').and('contain.text', "Phone number is not a valid dutch phone number!");
  })

  it('Should show error when password does not meet requirement',()=>{
    register("owner","ckw28502@gmail.com","owner","0639731213","a","OWNER","a",false)
    cy.get('div').should('exist').and('contain.text', "Password requirements haven't been fulfilled!");
  })

  it('Should show error when confirmation password is different from password',()=>{
    register("owner","ckw28502@gmail.com","owner","0639731213","Owner@123","OWNER","a",false)
    cy.get('div').should('exist').and('contain.text', "Confirmation Password is not equals to the password!");
  })

  it('Should show error terms and conditions has not been accepted',()=>{
    register("owner","ckw28502@gmail.com","owner","0639731213","Owner@123","OWNER","Owner@123",false)
    cy.get('div').should('exist').and('contain.text', "Terms and conditions has not been accepted!");
  })

  it('Should show error if username is taken',()=>{
    register("admin","ckw28502@gmail.com","owner","0639731213","Owner@123","OWNER","Owner@123",true)
    cy.wait("@createUser",{timeout:10000}).then(interception=>{
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Should register the user as owner',()=>{
    register("owner","ckw28502@gmail.com","owner","0639731213","Owner@123","OWNER","Owner@123",true)
    
    cy.wait("@createUser",{timeout:10000}).then(interception=>{
      expect(interception.response.statusCode).to.equal(201)
    })
  })

  it('Should register the user as customer',()=>{
    register("customer","ckw28502@gmail.com","customer","0639731213","Customer@123","CUSTOMER","Customer@123",true)
    
    cy.wait("@createUser",{timeout:10000}).then(interception=>{
      expect(interception.response.statusCode).to.equal(201)
    })
  })

})