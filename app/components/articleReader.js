module.exports={
    data(){
        return {

        }
    },
    props:["url"]
    ,
    created(){
        console.log(this.url);
    }
    ,

    template:
    `
    <Page class="page">
    <ActionBar flat="true" title="Reading...">
    </ActionBar>
     <StackLayout>

    <WebView :src="url" />

       
    </StackLayout>
     
  </Page>



    `
}