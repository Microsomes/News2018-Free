const Counter = require('./Counter');

const About= require('./about');

const login= require("./auth/login");

const guestMain= require('./guest/dashboard');



module.exports = {
  data() {
    return {
      appName:'SocialStation Beta 0.0.1',
      name:[
        'one',
        'two',
        'three'
      ]
    };
  },
  methods:{
    goToDetailPage(){
      this.$navigateTo(About);
    }
  }
  ,
  template: `
    <Page class="page">
      <ActionBar class="action-bar" :title="appName"/>
  
      <StackLayout>
     
      <TabView   selectedColor="white" >
         
        <TabViewItem title="Guest">
          <guestMain/>
        </TabViewItem>
        <TabViewItem title="Login In/Up">
         <login/>
        </TabViewItem>
      </TabView>
        
      </StackLayout>

    </Page>
  `,
  components: {
    Counter,
    login,
    guestMain
  },
};
