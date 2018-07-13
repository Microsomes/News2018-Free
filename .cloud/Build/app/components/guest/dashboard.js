module.exports={
    data(){
        return {

        }
    },
    template:
    `
    <Page class="page">
 
    <StackLayout class="mainbb">

 
    <TabView class="tab_guest" selectedColor="white">
    <TabViewItem title="B">
    <Label text="Blog" />

     </TabViewItem>
    <TabViewItem class="tab-guest" title="C">
      <Label text="Confessions" />
    </TabViewItem>
    <TabViewItem title="con" >
    <Label text="Conspiracies coming soon" />
  </TabViewItem>
  <TabViewItem title="F">
  <Label text="Facts" />
</TabViewItem>
<TabViewItem title="Eid">
<Label text="The Eid show coming soon" />
</TabViewItem>
  </TabView>
      
    </StackLayout>
    
  </Page>



    `
}