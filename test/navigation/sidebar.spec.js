const {expect}=require("chai");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const config=require("../../config/env");

describe("Navigation - Sidebar",function(){
  let driver;
  beforeEach(async function(){
    driver=await createDriver();
    const login=new LoginPage(driver);
    await login.open();
    await login.login(config.username,config.password);
  });
  afterEach(async function(){if(driver) await driver.quit();});

  const modules=[
    ["Admin","/web/index.php/admin/viewAdminModule"],
    ["PIM","/web/index.php/pim/viewPimModule"],
    ["Leave","/web/index.php/leave/viewLeaveModule"],
    ["Time","/web/index.php/time/viewTimeModule"],
    ["Recruitment","/web/index.php/recruitment/viewRecruitmentModule"],
    ["My Info","/web/index.php/pim/viewMyDetails"]
  ];

  for(const [name,href] of modules){
    it(`should display ${name} menu item`,async function(){
      const links=await driver.findElements({css:`a[href*='${href.split("/web")[1]}']`});
      expect(links.length).to.be.greaterThan(0);
    });
  }
});