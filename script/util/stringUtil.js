'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) { 
		throw new TypeError("Cannot call a class as a function"); 
	} 
}

var StringUtil = function () {
    function StringUtil() { 
    	_classCallCheck(this, StringUtil);
    	
    	this.b2bcentral_desktop_bac_cred_desc_1  = { lmsId: "b2bcentral_desktop_bac_cred_desc_1" };
    	this.b2bcentral_desktop_bac_cred_desc_3  = { lmsId: "b2bcentral_desktop_bac_cred_desc_3" };
    	this.b2bcentral_desktop_bac_cred_desc_4  = { lmsId: "b2bcentral_desktop_bac_cred_desc_4" };
    	this.b2bcentral_desktop_bac_cred_link  = { lmsId: "b2bcentral_desktop_bac_cred_link" };
    	this.b2bcentral_desktop_bac_cred_tag  = { lmsId: "b2bcentral_desktop_bac_cred_tag" };
    	this.b2bcentral_desktop_bac_descriptor_1  = { lmsId: "b2bcentral_desktop_bac_descriptor_1" };
    	this.b2bcentral_desktop_bac_descriptor_2  = { lmsId: "b2bcentral_desktop_bac_descriptor_2" };
    	this.b2bcentral_desktop_bac_descriptor_3  = { lmsId: "b2bcentral_desktop_bac_descriptor_3" };
    	this.b2bcentral_desktop_bac_descriptor_4  = { lmsId: "b2bcentral_desktop_bac_descriptor_4" };
    	this.b2bcentral_desktop_bac_descriptor_5  = { lmsId: "b2bcentral_desktop_bac_descriptor_5" };
    	this.b2bcentral_desktop_bac_descriptor_6  = { lmsId: "b2bcentral_desktop_bac_descriptor_6" };
    	this.b2bcentral_desktop_bac_header  = { lmsId: "b2bcentral_desktop_bac_header" };
    	this.b2bcentral_desktop_bac_profile_desc_1  = { lmsId: "b2bcentral_desktop_bac_profile_desc_1" };
    	this.b2bcentral_desktop_bac_profile_desc_2  = { lmsId: "b2bcentral_desktop_bac_profile_desc_2" };
    	this.b2bcentral_desktop_bac_profile_link  = { lmsId: "b2bcentral_desktop_bac_profile_link" };
    	this.b2bcentral_desktop_bac_profile_tag  = { lmsId: "b2bcentral_desktop_bac_profile_tag" };
    	this.b2bcentral_desktop_bac_request_desc_1  = { lmsId: "b2bcentral_desktop_bac_request_desc_1" };
    	this.b2bcentral_desktop_bac_request_desc_2  = { lmsId: "b2bcentral_desktop_bac_request_desc_2" };
    	this.b2bcentral_desktop_bac_request_desc_3  = { lmsId: "b2bcentral_desktop_bac_request_desc_3" };
    	this.b2bcentral_desktop_bac_request_desc_4  = { lmsId: "b2bcentral_desktop_bac_request_desc_4" };
    	this.b2bcentral_desktop_bac_request_link  = { lmsId: "b2bcentral_desktop_bac_request_link" };
    	this.b2bcentral_desktop_bac_request_tag  = { lmsId: "b2bcentral_desktop_bac_request_tag" };
    	this.b2bcentral_desktop_bac_tooltip_content_1  = { lmsId: "b2bcentral_desktop_bac_tooltip_content_1" };
    	this.b2bcentral_desktop_bac_tooltip_content_2  = { lmsId: "b2bcentral_desktop_bac_tooltip_content_2" };
    	this.b2bcentral_desktop_bac_tooltip_header_1  = { lmsId: "b2bcentral_desktop_bac_tooltip_header_1" };
    	this.b2bcentral_desktop_bac_tooltip_header_2  = { lmsId: "b2bcentral_desktop_bac_tooltip_header_2" };
    	this.b2bcentral_desktop_bac_tooltip_link  = { lmsId: "b2bcentral_desktop_bac_tooltip_link" };
    	this.b2bcentral_desktop_bac_welcome_addp_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_addp_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_badge_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_badge_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_bpqd_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_bpqd_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_brand_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_brand_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_day1_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_day1_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_day1_link  = { lmsId: "b2bcentral_desktop_bac_welcome_day1_link" };
    	this.b2bcentral_desktop_bac_welcome_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_fba_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_fba_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_report_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_report_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_tag  = { lmsId: "b2bcentral_desktop_bac_welcome_tag" };
    	this.b2bcentral_desktop_bac_welcome_trust_desc_1  = { lmsId: "b2bcentral_desktop_bac_welcome_trust_desc_1" };
    	this.b2bcentral_desktop_bac_welcome_week1_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week1_link" };
    	this.b2bcentral_desktop_bac_welcome_week2_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week2_link" };
    	this.b2bcentral_desktop_bac_welcome_week3_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week3_link" };
    	this.b2bcentral_desktop_bac_welcome_week4_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week4_link" };
    	this.b2bcentral_desktop_bac_welcome_week5_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week5_link" };
    	this.b2bcentral_desktop_bac_welcome_week6_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week6_link" };
    	this.b2bcentral_desktop_bac_welcome_week7_link  = { lmsId: "b2bcentral_desktop_bac_welcome_week7_link" };
    	this.b2bcentral_desktop_guide_badge_content_1  = { lmsId: "b2bcentral_desktop_guide_badge_content_1" };
    	this.b2bcentral_desktop_guide_badge_content_2  = { lmsId: "b2bcentral_desktop_guide_badge_content_2" };
    	this.b2bcentral_desktop_guide_badge_content_3  = { lmsId: "b2bcentral_desktop_guide_badge_content_3" };
    	this.b2bcentral_desktop_guide_badge_header  = { lmsId: "b2bcentral_desktop_guide_badge_header" };
    	this.b2bcentral_desktop_guide_content_how  = { lmsId: "b2bcentral_desktop_guide_content_how" };
    	this.b2bcentral_desktop_guide_content_what  = { lmsId: "b2bcentral_desktop_guide_content_what" };
    	this.b2bcentral_desktop_guide_content_why  = { lmsId: "b2bcentral_desktop_guide_content_why" };
    	this.b2bcentral_desktop_guide_cred_content_1  = { lmsId: "b2bcentral_desktop_guide_cred_content_1" };
    	this.b2bcentral_desktop_guide_cred_content_2  = { lmsId: "b2bcentral_desktop_guide_cred_content_2" };
    	this.b2bcentral_desktop_guide_cred_content_3  = { lmsId: "b2bcentral_desktop_guide_cred_content_3" };
    	this.b2bcentral_desktop_guide_cred_header  = { lmsId: "b2bcentral_desktop_guide_cred_header" };
    	this.b2bcentral_desktop_guide_header  = { lmsId: "b2bcentral_desktop_guide_header" };
    	this.b2bcentral_desktop_guide_pd_content_1  = { lmsId: "b2bcentral_desktop_guide_pd_content_1" };
    	this.b2bcentral_desktop_guide_pd_content_2  = { lmsId: "b2bcentral_desktop_guide_pd_content_2" };
    	this.b2bcentral_desktop_guide_pd_content_3  = { lmsId: "b2bcentral_desktop_guide_pd_content_3" };
    	this.b2bcentral_desktop_guide_pd_header  = { lmsId: "b2bcentral_desktop_guide_pd_header" };
    	this.b2bcentral_desktop_guide_pricing_content_2  = { lmsId: "b2bcentral_desktop_guide_pricing_content_2" };
    	this.b2bcentral_desktop_guide_pricing_content_3  = { lmsId: "b2bcentral_desktop_guide_pricing_content_3" };
    	this.b2bcentral_desktop_guide_pricing_header  = { lmsId: "b2bcentral_desktop_guide_pricing_header" };
    	this.b2bcentral_desktop_guide_profile_content_1  = { lmsId: "b2bcentral_desktop_guide_profile_content_1" };
    	this.b2bcentral_desktop_guide_profile_content_2  = { lmsId: "b2bcentral_desktop_guide_profile_content_2" };
    	this.b2bcentral_desktop_guide_profile_content_3  = { lmsId: "b2bcentral_desktop_guide_profile_content_3" };
    	this.b2bcentral_desktop_guide_profile_header  = { lmsId: "b2bcentral_desktop_guide_profile_header" };
    	this.b2bcentral_desktop_guide_tooltip_content_1  = { lmsId: "b2bcentral_desktop_guide_tooltip_content_1" };
    	this.b2bcentral_desktop_kpi_1  = { lmsId: "b2bcentral_desktop_kpi_1" };
    	this.b2bcentral_desktop_kpi_2  = { lmsId: "b2bcentral_desktop_kpi_2" };
    	this.b2bcentral_desktop_kpi_3  = { lmsId: "b2bcentral_desktop_kpi_3" };
    	this.b2bcentral_desktop_sales_graph_1  = { lmsId: "b2bcentral_desktop_sales_graph_1" };
    	this.b2bcentral_desktop_sales_graph_10  = { lmsId: "b2bcentral_desktop_sales_graph_10" };
    	this.b2bcentral_desktop_sales_graph_11  = { lmsId: "b2bcentral_desktop_sales_graph_11" };
    	this.b2bcentral_desktop_sales_graph_12  = { lmsId: "b2bcentral_desktop_sales_graph_12" };
    	this.b2bcentral_desktop_sales_graph_13  = { lmsId: "b2bcentral_desktop_sales_graph_13" };
    	this.b2bcentral_desktop_sales_graph_14  = { lmsId: "b2bcentral_desktop_sales_graph_14" };
    	this.b2bcentral_desktop_sales_graph_2  = { lmsId: "b2bcentral_desktop_sales_graph_2" };
    	this.b2bcentral_desktop_sales_graph_3  = { lmsId: "b2bcentral_desktop_sales_graph_3" };
    	this.b2bcentral_desktop_sales_graph_4  = { lmsId: "b2bcentral_desktop_sales_graph_4" };
    	this.b2bcentral_desktop_sales_graph_5  = { lmsId: "b2bcentral_desktop_sales_graph_5" };
    	this.b2bcentral_desktop_sales_graph_6  = { lmsId: "b2bcentral_desktop_sales_graph_6" };
    	this.b2bcentral_desktop_sales_graph_7  = { lmsId: "b2bcentral_desktop_sales_graph_7" };
    	this.b2bcentral_desktop_sales_graph_8  = { lmsId: "b2bcentral_desktop_sales_graph_8" };
    	this.b2bcentral_desktop_sales_graph_9  = { lmsId: "b2bcentral_desktop_sales_graph_9" };
    	this.b2bcentral_desktop_sales_header  = { lmsId: "b2bcentral_desktop_sales_header" };
    	this.b2bcentral_desktop_sales_link  = { lmsId: "b2bcentral_desktop_sales_link" };
    	this.b2bcentral_desktop_sales_table_1  = { lmsId: "b2bcentral_desktop_sales_table_1" };
    	this.b2bcentral_desktop_sales_table_2  = { lmsId: "b2bcentral_desktop_sales_table_2" };
    	this.b2bcentral_desktop_sales_table_3  = { lmsId: "b2bcentral_desktop_sales_table_3" };
    	this.b2bcentral_desktop_sales_table_4  = { lmsId: "b2bcentral_desktop_sales_table_4" };
    	this.b2bcentral_desktop_sales_table_5  = { lmsId: "b2bcentral_desktop_sales_table_5" };
    	this.b2bcentral_desktop_sales_tooltip_content_1  = { lmsId: "b2bcentral_desktop_sales_tooltip_content_1" };
    	this.b2bcentral_desktop_sales_tooltip_content_2  = { lmsId: "b2bcentral_desktop_sales_tooltip_content_2" };
    	this.b2bcentral_desktop_sales_tooltip_header_1  = { lmsId: "b2bcentral_desktop_sales_tooltip_header_1" };
    	this.b2bcentral_desktop_sales_tooltip_header_2  = { lmsId: "b2bcentral_desktop_sales_tooltip_header_2" };
    	this.b2bcentral_desktop_sales_tooltip_link  = { lmsId: "b2bcentral_desktop_sales_tooltip_link" };
    	this.b2bcentral_desktop_welcome_content_1  = { lmsId: "b2bcentral_desktop_welcome_content_1" };
    	this.b2bcentral_desktop_welcome_content_2  = { lmsId: "b2bcentral_desktop_welcome_content_2" };
    	this.b2bcentral_desktop_welcome_link  = { lmsId: "b2bcentral_desktop_welcome_link" };
    	this.b2bcentral_desktop_hide_overview_link  = { lmsId: "b2bcentral_desktop_hide_overview_link" };
    	this.b2bcentral_desktop_show_overview_link  = { lmsId: "b2bcentral_desktop_show_overview_link" };
    	this.b2bcentral_desktop_calender_from  = { lmsId: "b2bcentral_desktop_calender_from" };    	
    	this.b2bcentral_desktop_calender_to  = { lmsId: "b2bcentral_desktop_calender_to" };
    	this.b2bcentral_desktop_calender_daterange  = { lmsId: "b2bcentral_desktop_calender_daterange" };
    	this.b2bcentral_desktop_sales_error  = { lmsId: "b2bcentral_desktop_sales_error" };
    	this.b2bcentral_desktop_sales_nodata  = { lmsId: "b2bcentral_desktop_sales_nodata" };
    	this.b2bcentral_desktop_updating  = { lmsId: "b2bcentral_desktop_updating" };
    	this.b2bcentral_desktop_lastupdate  = { lmsId: "b2bcentral_desktop_lastupdate" };    	
    	this.b2bcentral_desktop_dateRange_1  = { lmsId: "b2bcentral_desktop_dateRange_1" };
    	this.b2bcentral_desktop_welcome_header = { lmsId: "b2bcentral_desktop_welcome_header" };
    	this.b2bcentral_desktop_guide_pricing_content_1 = { lmsId: "b2bcentral_desktop_guide_pricing_content_1" };
    	this.b2bcentral_desktop_menu_minimize = { lmsId: "b2bcentral_desktop_menu_minimize" };
    	this.b2bcentral_desktop_menu_maximize = { lmsId: "b2bcentral_desktop_menu_maximize" };
    	this.b2bcentral_desktop_menu_rate = { lmsId: "b2bcentral_desktop_menu_rate" };
    	this.b2bcentral_desktop_menu_refresh = { lmsId: "b2bcentral_desktop_menu_refresh" };
    	this.b2bcentral_desktop_welcome_video_link = { lmsId: "b2bcentral_desktop_welcome_video_link" };
    	this.b2bcentral_desktop_welcome_link = { lmsId: "b2bcentral_desktop_welcome_link" };
    	this.b2bcentral_desktop_navigation_b2b = { lmsId: "b2bcentral_desktop_navigation_b2b" };
    	this.b2bcentral_desktop_hmd_link = { lmsId: "b2bcentral_desktop_hmd_link" };

    }

    _createClass(StringUtil, null, [{
        key: 'getString',
        value: function getString(id) {
            var element = document.getElementById(id);
            if (element === null) {
                return id;
            }

            return element.innerText;
        }
    }, {
        key: 'formatString',
        value: function formatString(text, args) {
            return text.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        }
    }]);
   
    return StringUtil;
}();

exports.default = StringUtil;