module.exports={
    data(){
        return {
            title:"Newsify"
        }
    },
    template:
    `<ScrollView orientation="horizontal">

    <StackLayout>
    <SegmentedBar selectedBackgroundColor="#787878">
  <SegmentedBarItem title="Headlines" />
  <SegmentedBarItem title="Bitcoin" />
  <SegmentedBarItem title="Politics" />
  <SegmentedBarItem title="War" />
  <SegmentedBarItem title="Trending" />
  </SegmentedBar>
</StackLayout>

</ScrollView>
 

    `
}