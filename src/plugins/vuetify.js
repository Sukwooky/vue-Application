import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({

    //breakpoint : {
    //    mobileBreakpoint : "xs",
    //    thresholds: {
    //        
    //    }
    //},

    theme: {
        themes: {
          light: {
            rtrActive : '#ed4215'
          },
        },
    },
    //icons : {
    //  iconfont : 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    //}
});
