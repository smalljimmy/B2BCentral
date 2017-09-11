import Immutable from 'immutable';
import StringUtil from "../util/stringUtil";

export function staticManifest() {
    const manifest = {
        children: [
            {
                id: 'titleSection',
                type: 'TitleSection',
                props: {
                    key: 'titleSection',
                    titlePanel: {
                        heading: {
                            width: 12,
                            cssClass: 'b2bCent-title',
                            level: 1,
                        },
                        dataBindings: {
                            salesDataHourly: {
                                queryName: 'orderMetrics/hourly',
                            },
                        },                         
                    },
                },
            },
            {
                id: 'dataSection',
                type: 'DataSection',
                props: {
                    key: 'dataSection',
                    leftCards: [
                        {
                            key: 'salesCard',
                            baseCardProps: {
                            	title: StringUtil.getString('b2bcentral_desktop_sales_header'),
                            	topicId: 'salesCard',
                            	updatedDateLabel: {
                                    lastUpdated: StringUtil.getString('b2bcentral_desktop_lastupdate'),
                                    updating: StringUtil.getString('b2bcentral_desktop_updating'),
                                },
                                width: 12,
                                hmdName: 'jayabhcHMDTest2',
                            },
                            dataBindings: {
                                salesData: {
                                    queryName: 'orderMetrics',
                                    endPoint: '/b2bcentral/proxy/queryData',
                                },
                                salesDataHourly: {
                                    queryName: 'orderMetrics/hourly',
                                    endPoint: '/b2bcentral/proxy/queryData',
                                },
                            },
                            children: [
                               {
                                   id: 'salesGraph',
                                   type: 'GraphContainer',
                                   props: {
                                       key: 'salesGraph',
                                   },
                               }                                        
                            ],                            
                        },
                    ],
                    rightCards: [
                        {
                            key: 'actionCenterCard',
                            baseCardProps: {
                                title: StringUtil.getString('b2bcentral_desktop_bac_header'),
                                updatedDateLabel: {
                                    lastUpdated: StringUtil.getString('b2bcentral_desktop_lastupdate'),
                                    updating: StringUtil.getString('b2bcentral_desktop_updating'),
                                },
                                badge: 'badges',
                            },
                            dataBindings: {
                                tasksData: {
                                    queryName: 'tasks',
                                    endPoint: '/b2bcentral/proxy/queryData',
                                },
                                badgeData: {
                                    queryName: 'badges',
                                    endPoint: '/b2bcentral/proxy/queryData',
                                },                                
                             },
                            children: [
                               {
                                   id: 'actionCenter',
                                   //type: 'ActionCenter',
                                   props: {
                                       key: 'actionCenter',
                                   }
                               }
                            ],     
                        },
                        {
                            key: 'guideCard',
                            baseCardProps: {
                                title: StringUtil.getString('b2bcentral_desktop_guide_header')
                            },
                            dataBindings: {
                            },
                            children: [
                              {
                               id: 'guideContainer',
                               type: 'GuideContainer',
                               props: {
                                   key: 'guideContainer',
                               }
                              }
                            ],
                        },                        
                    ],
                },
            },
        ],
    };
    return manifest;
    
}
