beforeEach(()=>{
  cy.visit('http://localhost:5173')
  cy.get("input[name='username']").type("malexander2")
  cy.get("input[name='password']").type("malexander2")
  cy.get("button").click()
  cy.url().should("include","/owner")
})

function uploadImage(){
  const fileName="ckw28502.jpg";
  cy.fixture(fileName).then(fileContent=>{
    cy.get("input[type='file']").attachFile({
      fileContent,
      fileName,
      mimeType: 'image/jpeg'
    })
  })
}

describe('properties', () => {
  beforeEach(()=>{
    cy.contains("a","Properties").click()
  })
  it('should create property', () => {
    cy.get("button[id='addButton']").click()
    uploadImage()
    cy.get("input[name='streetName']").type("street")
    cy.get("input[name='houseNumber']").type(1)
    cy.get("input[name='postCode']").type("1111AA")
    cy.get("input[name='cityName']").type("city")
    cy.get("input[name='price']").type(800)
    cy.get("input[name='area']").type(12)
    cy.get("textarea").type("Comfortable place")
    cy.get("button[id='btnModal2']").click()

    cy.intercept('POST',"http://localhost:8080/properties").as("createProperty")

    cy.wait("@createProperty",{timeout:10000}).then(interception=>{
      expect(interception.response.statusCode).to.equal(200)
    })
  })

  it('should edit property', () => {
    cy.get("button[id='edit_property_1']").click()
    cy.get("input[name='price']").type(700)
    cy.get("input[name='area']").type(11)
    cy.get("textarea").type("Nice place")
    cy.get("button[id='btnModal2']").click()

    cy.intercept('PUT',"http://localhost:8080/properties/1").as("editProperty")

    cy.wait("@editProperty").then(interception=>{
      expect(interception.response.statusCode).to.equal(200)
    })
  })
  it('should delete property', () => {
    cy.get("button[id='delete_property_1']").click()
    cy.get("button[id='btnModal2']").click()

    cy.intercept('DELETE',"http://localhost:8080/properties/1").as("deleteProperty")

    cy.wait("@deleteProperty").then(interception=>{
      expect(interception.response.statusCode).to.equal(204)
    })
  })
})