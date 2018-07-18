module.exports={
    data(){
        return {
            title:"Newsify",
            tags:[
                "Headlines",
                "Bitcoin",
                "Politics",
                "War",
                "Trending",
                "Twinkies",
                "Add Tag"
            ]
        }
    },
    methods:{
        hideTags(){
            //method will hide the tags
            console.log("request came in to hide the tags");
        },
        tagSelected(args){
            if(this.tags[args.value]=="Add Tag"){
                console.log("add tag");
                return;
            }
            console.log("tag selected");
            //tag selected
            this.$emit('test', this.tags[args.value]);
         }
    },created(){
        //find if any additional tags have been created and add them
    }
    ,
    template:
    `<ScrollView orientation="horizontal">

    <StackLayout>
    <SegmentedBar @selectedIndexChange="tagSelected"  selectedIndex="0"   selectedBackgroundColor="#787878">
        <SegmentedBarItem v-for="n in tags" :title="n" />
  </SegmentedBar>
</StackLayout>

</ScrollView>
 

    `
}