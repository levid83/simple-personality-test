/// <reference types="cypress" />
beforeEach(() => {
  cy.visit("/");
});

describe("Landing page", () => {
  it("should contain key elements", () => {
    cy.get(".header").contains("Personality test");
    cy.get("nav").contains("Home");
    cy.get(".intro").contains("Introvert");
    cy.get(".intro").contains("Extrovert");
    cy.get(".btn").contains("Start the test");
    cy.get("footer").contains("Made by");
  });

  it("should go to quiz section by clicking on start test button", () => {
    cy.get(".start-test").click({ force: true });
    cy.get(".quiz").should("be.visible");
  });

  it("should go to the next question by selecting an answer and clicking on the next button", () => {
    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();
  });

  it("should get the quiz evaluation after sending the answers", () => {
    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Next").click();

    cy.get(".answer").first().click();
    cy.get("button.btn").contains("Finish").click();

    cy.get(".personality-type").contains("AMBIVERT");
    cy.get(".explanation").contains("Most people");
  });
});

export {};
