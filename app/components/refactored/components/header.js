var nstoasts = require("nativescript-toasts");
const sourceModal= require("./../components/sourceSelect");
//source select modal


module.exports={
    data(){
        return {
            title:"Newsify- BBC News",
            state:{
                tag:'headlines',
                source:'bbc-news'
            }
        }
    },
    methods:{
        refreshNewsSource(){
        //method that refreshes news
        this.toToast("refreshing"+this.state.source);
        this.toToast("refreshing"+this.state.tag);
        },
        openSources(){
            this.toToast("Opening");
            this.$showModal(sourceModal).then(data => console.log(data));

        },
        toToast(msg){
            if(msg){
            //method will fire a toast
            var options = {
                text: msg,
                duration : nstoasts.DURATION.SHORT,
                position : nstoasts.POSITION.BOTTOM //optional
            }
            nstoasts.show(options);
        }
        },
        loadNews(tag,source,type){
            //method used to load news will load depending on source and tag
            //type e.g newsapi.org or generic
            if(type=="newsapiorg"){
                //load newsapi.org souces



            }else{
                //load generic news souces such as everything that is not newsapi.org
            }



        }



    }
    ,
    template:
    `    
    <ActionBar flat="true" :title="title">
    <ActionItem @tap="openSources" text="Sources"></ActionItem>
    <ActionItem @tap="refreshNewsSource" android.systemIcon="ic_menu_refresh" android.position="actionBar" text="Sources"></ActionItem>
     </ActionBar>
 

    `
}