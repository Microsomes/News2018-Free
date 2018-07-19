require( "nativescript-master-technology" );

module.exports={
    data(){
        return {

        }
    },
    methods:{
        attemptConnecting(){
            process.restart()

        }
    },
    template:
    `
    <Page backgroundColor="#3c495e" class="page">  
    
    <ActionBar background="#3c495e" flat="true" title="">
     </ActionBar>
 
    <StackLayout>
    <Label textWrap="true" class="not_connected_text" text="You are not connected to the internet" />
    <FlexboxLayout alignItems="center" justifyContent="center"  backgroundColor="#3c495e">

    <Image class="sad_face" src="~/images/sad.png" stretch="none" />
    </FlexboxLayout>



    <Button width="350px;" @tap="attemptConnecting" text="try again"></Button>

       
    </StackLayout>
    
  </Page>



    `
}