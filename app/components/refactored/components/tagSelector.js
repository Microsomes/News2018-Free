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
                "Twinkies"
            ]
        }
    },
    methods:{
        tagSelected(args){
            console.log("tag selected");
            //tag selected
            this.$emit('test', this.tags[args.value]);
         }
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