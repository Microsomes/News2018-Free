const Counter = require('./Counter');

module.exports = {
  data() {
    return {
      appName:'About'
    };
  },
  template: `
    <Page class="page">
      <ActionBar class="action-bar" :title="appName"/>
  
      <StackLayout>
       
      <TabView class="tab">
        <TabViewItem title="Login In/Up">
          <Label text="login" />
        </TabViewItem>
        <TabViewItem title="Guest">
          <Label text="..." />
        </TabViewItem>
      </TabView>
        
      </StackLayout>
    </Page>
  `,
  components: {
    Counter,
  },
};
