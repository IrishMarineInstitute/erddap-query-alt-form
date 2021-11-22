(this["webpackJsonperddap-form-component"]=this["webpackJsonperddap-form-component"]||[]).push([[0],{116:function(e,a,t){e.exports=t(137)},121:function(e,a,t){},123:function(e,a,t){},137:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(10),i=t.n(l),s=(t(121),t(122),t(123),t(79)),o=t.n(s),u=t(88),c=t(18),d=t(199),m=t(194),h=t(174),v=t(177),p=t(195),f=t(125),b=function(e){e=e||"https://coastwatch.pfeg.noaa.gov/erddap/",this.base_url=e.replace(/\/+$/,""),this._datasets={}},g=function(e,a){var t={param:".jsonp"};return a&&(t.name=a),new Promise((function(a,n){f(e,t,(function(e,t){e?n(e):a(t)}))}))};b.prototype.fetchAwesomeErddaps=function(){return g("https://irishmarineinstitute.github.io/awesome-erddap/erddaps.jsonp","awesomeErddapsCb")},b.prototype.search=function(e,a,t,n){a=a||1,t=t||1e4;var r=this.base_url+"/search/index.json?",l=new URLSearchParams("?");return l.set("searchFor",e),l.set("page",a),l.set("itemsPerPage",t),g(r+l.toString()).then(y)},b.prototype.listDatasets=function(){return this.search("tabledap").then((function(e){return e&&e.length?e.map((function(e){return e["Dataset ID"]})).sort():[]}))};var y=function(e){var a=e.table.columnNames,t=[];return e.table.rows.forEach((function(e){for(var n=[],r=0;r<a.length;r++)n[a[r]]=e[r];t.push(n)})),t},w=function(e,a){if(e instanceof Date)return a?e.toISOString2():"("+e.toISOString2()+")";try{var t=new Date(e).toISOString2();return a?t:"("+t+")"}catch(n){return e}},E=function(e,a){this.erddap=e,this.dataset_id=a,this.subsets={},this._fetchMetadata=this.erddap.search("datasetID="+this.dataset_id).then(function(e){for(var t=0;t<e.length;t++)if(e[t]["Dataset ID"]===this.dataset_id)return e[t];throw new Error("Unknown dataset: ["+a+"]")}.bind(this)).then(function(e){this._summary=e;var a=this.erddap.base_url+"/info/"+this.dataset_id+"/index.json";return g(a).then((function(e){for(var a={},t=0;t<e.table.rows.length;t++){var n=e.table.rows[t];a[n[0]]=a[n[0]]||{},a[n[0]][n[1]]=a[n[0]][n[1]]||{},a[n[0]][n[1]][n[2]]=a[n[0]][n[1]][n[2]]||{},a[n[0]][n[1]][n[2]].type=n[3],a[n[0]][n[1]][n[2]].value=n[4]}return a})).then(function(e){var a={},t={_fieldnames:[],_type:{}},n=[];try{n=e.attribute.NC_GLOBAL.subsetVariables.value.split(",").map((function(e){return e.trim()}))}catch(c){}for(var r=["dimension","variable"],l=0;l<r.length;l++){var i=r[l];if(e[i])for(var s in"dimension"===i&&(t.dimensions={}),e[i]){t._type[s]="String",t._fieldnames.push(s);var o=e[i][s][""].type,u=""+e[i][s][""].value;switch(o){case"float":case"double":a[s]=function(e){return isNaN(e)?null:e},t._type[s]="Number";break;case"int":case"long":case"short":case"byte":a[s]=function(e){return isNaN(e)?null:e},t._type[s]="Integer";break;case"String":case"char":a[s]=function(e){return'"'+e+'"'};break;default:throw new Error("Unknown type ["+o+"] for "+t.id+"."+s)}if(e.attribute[s]&&e.attribute[s]._CoordinateAxisType)switch(e.attribute[s]._CoordinateAxisType.value){case"Time":t.time_dimension=s,a[s]=w,a.since=w,a.until=w,t._type[s]="Time";break;case"Lat":t.lat_dimension=s;break;case"Lon":t.lon_dimension=s}"dimension"!==i&&e.dimension&&u&&(t.dimensions[s]=u.split(/[ ,]+/)),"time"===s&&(t.time_dimension=s,a[s]=w,t._type[s]="Time")}}return t.param_encoder=a,t.base_url=this.erddap.base_url,t.id=this.dataset_id,t.info=e,t.subsetVariables=n,t.encode=function(e,a,t){var n=this.param_encoder[e](t);return"".concat(e).concat(a).concat(n)}.bind(t),t.subsets=this.subsets,this._meta=t,t}.bind(this))}.bind(this))};E.prototype.variables=function(){return this._meta.info.variable},E.prototype.fetchMetadata=function(){return this._fetchMetadata},E.prototype.prepareSubset=function(e){var a=this;void 0===this.subsets[e]&&(this.subsets[e]=null,this.fetchData(e+"&distinct()").then((function(t){a.subsets[e]=t.map((function(a){return a[e]}))})))},E.prototype.getDataUrl=function(e){return this.erddap.base_url+"/tabledap/"+this.dataset_id+e+"?"},E.prototype.fetchData=function(e){var a=this.getDataUrl(".json")+e;return g(a).then(y)},b.prototype.dataset=function(e){return this._datasets[e]=this._datasets[e]||new E(this,e),this._datasets[e]};var O=b,S=t(46),C=t(47),_=t(33),D=t(50),k=t(51),j=t(11),F=t(96),I=t(81);var V=Object(I.b)((function(e){var a={onMouseDown:function(e){e.preventDefault(),e.stopPropagation()}};return r.a.createElement(j.z.MultiValue,Object.assign({},e,{innerProps:a}))})),A=Object(I.a)(F.a),T=function(e){Object(k.a)(t,e);var a=Object(D.a)(t);function t(){return Object(S.a)(this,t),a.apply(this,arguments)}return Object(C.a)(t,[{key:"render",value:function(){var e=this.props,a=e.options,t=e.selected,n=e.onChange,l=e.placeholder;return r.a.createElement(A,{axis:"xy",onSortEnd:function(e){var a,r,l,i=e.oldIndex,s=e.newIndex,o=(r=i,l=s,(a=(a=t).slice()).splice(l<0?a.length+l:l,0,a.splice(r,1)[0]),a);n(o)},distance:4,getHelperDimensions:function(e){return e.node.getBoundingClientRect()},isMulti:!0,options:a,value:t,onChange:n,components:{MultiValue:V},closeMenuOnSelect:!1,noOptionsMessage:function(){return r.a.createElement("i",null,"No more variables...")},placeholder:l||"Select..."})}}]),t}(r.a.Component),x=t(80),P=t(197),M=t(192),N=t(181);function U(e){var a=e.variable,t=e.operation,n=e.onValueAssigned,l=e.metadata,i=a+" "+H[t],s=r.a.useState("_choose"),o=Object(c.a)(s,2),u=o[0],m=o[1],f=function(e,r,l){var i=e.target.value;m(i),n(a,t,i)},b=l.subsets[a];if(b){l._type[a];return r.a.createElement(h.a,{component:"fieldset",margin:"dense"},r.a.createElement(v.a,{component:"legend"},i),r.a.createElement(p.a,{label:i,value:u,onChange:f},r.a.createElement(d.a,{key:"_choose",value:"_choose"},"Choose... "),b.map((function(e){return r.a.createElement(d.a,{key:e,value:e},e)}))))}return r.a.createElement(P.a,{label:i,variant:"outlined",onChange:f})}function L(e){var a=r.a.useState("0"),t=Object(c.a)(a,2),n=t[0],l=t[1],i=r.a.useState("now-"),s=Object(c.a)(i,2),o=s[0],u=s[1],m=r.a.useState("hours"),f=Object(c.a)(m,2),b=f[0],g=f[1],y=r.a.useState(1),w=Object(c.a)(y,2),E=w[0],O=w[1],S=r.a.useState(!1),C=Object(c.a)(S,2),_=(C[0],C[1]),D=r.a.useState(!1),k=Object(c.a)(D,2),j=k[0],F=k[1],I=e.variable,V=e.operation,A=e.onValueAssigned,T=I+" "+H[V],x=function(e){var a;try{a=e.toISOString().substring(0,18)+"Z"}catch(t){return void _(!0)}F(e),_(!1),A(I,V,a)};return"0"===n?r.a.createElement(p.a,{labelId:T,value:n,onChange:function(e){return l(e.target.value)}},r.a.createElement(d.a,{key:"0",value:"0"},"Choose how to specify ",I,"... "),r.a.createElement(d.a,{key:"absolute",value:"absolute"},"A specific date/time..."),")",r.a.createElement(d.a,{key:"relative",value:"relative"},"A time relative to when the query is run..."),")"):"relative"===n?r.a.createElement(h.a,{component:"fieldset",margin:"dense"},r.a.createElement(v.a,{component:"legend"},T),r.a.createElement(N.a,{row:!0},r.a.createElement(p.a,{value:o,onChange:function(e){var a=e.target.value;u(a),A(I,V,a+E+b)}},r.a.createElement(d.a,{key:"nowPlus",value:"now+"},"NOW plus"),")",r.a.createElement(d.a,{key:"nowMinus",value:"now-"},"NOW minus")),r.a.createElement(P.a,{type:"number",InputProps:{inputProps:{min:1}},value:E,onChange:function(e){var a=parseInt(e.target.value);O(a),A(I,V,o+a+b)}}),r.a.createElement(p.a,{value:b,onChange:function(e){var a=e.target.value;g(a),A(I,V,o+E+a)}},r.a.createElement(d.a,{key:"seconds",value:"seconds"},1===E?"second":"seconds"),r.a.createElement(d.a,{key:"minutes",value:"minutes"},1===E?"minute":"minutes"),r.a.createElement(d.a,{key:"hours",value:"hours"},1===E?"hour":"hours"),r.a.createElement(d.a,{key:"days",value:"days"},1===E?"day":"days"),r.a.createElement(d.a,{key:"months",value:"months"},1===E?"month":"months"),r.a.createElement(d.a,{key:"years",value:"years"},1===E?"year":"years")))):(!1===j&&x(new Date((new Date).toISOString().substring(0,10)+"Z")),r.a.createElement(M.a,{variant:"inline",ampm:!1,label:T,value:j,onChange:x,onError:console.log,format:"yyyy-MM-dd HH:mm:ss"}))}var H={"=":"equals","!=":"does not equal","<":"is less than",">":"is greater than",">=":"is not less than","<=":"is not greater than","=~":"matches the regular expression"};function J(e){var a=e.variable,t=e.value,n=e.datatype,l=e.onChange,i=["=","!=","<",">","<=",">="];return"String"===n&&i.push("=~"),r.a.createElement(p.a,{labelId:a,value:t,onChange:l},r.a.createElement(d.a,{key:"0",value:"0"},"Filter by ",a," ... "),i.map((function(e){return r.a.createElement(d.a,{key:e,value:e},a," ",H[e])})))}function R(e){var a=e.variables,t=e.onChange;return r.a.createElement(p.a,{value:"__choose__",onChange:t},r.a.createElement(d.a,{key:"__choose__",value:"__choose__"},"Add a filter..."),a.map((function(e){return r.a.createElement(d.a,{key:e,value:e},e)})))}function q(e){var a=r.a.useState(null),t=Object(c.a)(a,2),n=t[0],l=t[1],i=r.a.useState(null),s=Object(c.a)(i,2),o=s[0],u=s[1],d=e.variables,m=e.onVariableSelected,h=e.onValueAssigned,v=e.metadata,p=v._type[n];return o?"Time"===p?r.a.createElement(L,{variable:n,metadata:v,operation:o,onValueAssigned:h}):r.a.createElement(U,{variable:n,metadata:v,operation:o,onValueAssigned:h}):n?r.a.createElement(J,{datatype:p,variable:n,value:"0",onChange:function(e){u(e.target.value)}}):r.a.createElement(R,{variables:d,onChange:function(e){"__choose__"!==e.target.value&&(l(e.target.value),m(e.target.value))}})}var B=t(93),G=t.n(B),z=t(183);function W(e){var a=Object(n.useState)([{key:Math.random()}]),t=Object(c.a)(a,2),l=t[0],i=t[1],s=e.variables,o=e.metadata,u=e.onFiltersChanged,d=function(e){i([].concat(Object(x.a)(l),[{key:Math.random()}]))},h=function(e){var a=l.filter((function(a){return a.key!==e.key}));i(a),u&&u(a.filter((function(e){return e.uri_component})))},p=function(e,a,t,n){if(void 0!==n){var r=Object(x.a)(l);r.forEach((function(r){r.key===e.key&&((""+n).length?(r.variable=a,r.constraint=t,r.value=n,r.uri_component=o.encode(a,t,n)):(delete r.variable,delete r.constraint,delete r.value))})),i(r),u&&u(r.filter((function(e){return e.uri_component})))}};return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{component:"legend"},"Filters"),l.map((function(e,a){var t,n=h.bind(null,e),i=p.bind(null,e);return a+1<l.length&&(t=r.a.createElement(z.a,{onClick:n},r.a.createElement(G.a,null))),r.a.createElement(m.a,{m:1,key:e.key,component:"div",display:"block"},r.a.createElement(q,{key:e.key,variables:s,metadata:o,onVariableSelected:d,onValueAssigned:i}),t)})))}var K=t(185),X=t(189),Z=t(188),$=t(184),Q=t(186),Y=t(187),ee=t(180),ae=t(182);function te(e){var a=e.data,t=e.variables;if(!t||!t.length)return"";var n=t;return r.a.createElement(r.a.Fragment,null,r.a.createElement(ae.a,{variant:"h5",gutterBottom:!0},"Example Results:"),r.a.createElement($.a,{component:ee.a},r.a.createElement(K.a,{size:"small","aria-label":"a dense table"},r.a.createElement(Q.a,null,r.a.createElement(Y.a,null,n.map((function(e,a){return r.a.createElement(Z.a,{key:a},e)})))),r.a.createElement(X.a,null,a.map((function(e,a){return r.a.createElement(Y.a,{key:a},n.map((function(a,t){return r.a.createElement(Z.a,{key:t},e[a])})))}))))))}var ne=t(94),re=[{value:".asc",label:".asc - View OPeNDAP-style ISO-8859-1 comma-separated text."},{value:".csv",label:".csv - Download a ISO-8859-1 comma-separated text table (line 1: names; line 2: units; ISO 8601 times)."},{value:".csv0",label:".csv0 - Download a ISO-8859-1 .csv file without column names or units. Times are ISO 8601 strings."},{value:".csvp",label:".csvp - Download a ISO-8859-1 .csv file with line 1: name (units). Times are ISO 8601 strings."},{value:".das",label:".das - View the dataset's metadata via an ISO-8859-1 OPeNDAP Dataset Attribute Structure (DAS)."},{value:".dds",label:".dds - View the dataset's structure via an ISO-8859-1 OPeNDAP Dataset Descriptor Structure (DDS)."},{value:".dods",label:".dods - OPeNDAP clients use this to download the data in the DODS binary format."},{value:".esriCsv",label:".esriCsv - Download a ISO_8859_1 .csv file for ESRI's ArcGIS 9.x and below (separate date and time columns)."},{value:".fgdc",label:".fgdc - View the dataset's UTF-8 FGDC .xml metadata."},{value:".geoJson",label:".geoJson - Download longitude,latitude,otherColumns data as a UTF-8 GeoJSON .json file."},{value:".graph",label:".graph - View a Make A Graph web page."},{value:".help",label:".help - View a web page with a description of tabledap."},{value:".html",label:".html - View an OPeNDAP-style HTML Data Access Form."},{value:".htmlTable",label:".htmlTable - View a UTF-8 .html web page with the data in a table. Times are ISO 8601 strings."},{value:".iso19115",label:".iso19115 - View the dataset's ISO 19115-2/19139 UTF-8 .xml metadata."},{value:".itx",label:".itx - Download an ISO-8859-1 Igor Text File. Each response column becomes a wave."},{value:".json",label:".json - View a table-like UTF-8 JSON file (missing value = 'null'; times are ISO 8601 strings)."},{value:".jsonlCSV",label:".jsonlCSV - View a UTF-8 JSON Lines CSV file (missing value = 'null'; times are ISO 8601 strings)."},{value:".jsonlKVP",label:".jsonlKVP - View a UTF-8 JSON Lines file with Key:Value pairs (missing value = 'null'; times are ISO 8601 strings)."},{value:".kml",label:".kml - View a .kml file, suitable for Google Earth."},{value:".largePdf",label:".largePdf - View a large .pdf image file with a graph or map."},{value:".largePng",label:".largePng - View a large .png image file with a graph or map."},{value:".mat",label:".mat - Download a MATLAB binary file."},{value:".nc",label:".nc - Download a flat, table-like, NetCDF-3 binary file with COARDS/CF/ACDD metadata."},{value:".ncCF",label:".ncCF - Download a NetCDF-3 CF Discrete Sampling Geometries file (Contiguous Ragged Array)."},{value:".ncCFHeader",label:".ncCFHeader - View the UTF-8 header (the metadata) for the .ncCF file."},{value:".ncCFMA",label:".ncCFMA - Download a NetCDF-3 CF Discrete Sampling Geometries file (Multidimensional Array)."},{value:".ncCFMAHeader",label:".ncCFMAHeader - View the UTF-8 header (the metadata) for the .ncCFMA file."},{value:".ncHeader",label:".ncHeader - View the UTF-8 header (the metadata) for the NetCDF-3 .nc file."},{value:".nccsv",label:".nccsv - Download a NetCDF-3-like 7-bit ASCII NCCSV .csv file with COARDS/CF/ACDD metadata."},{value:".nccsvMetadata",label:".nccsvMetadata - View the dataset's metadata as the top half of a 7-bit ASCII NCCSV .csv file."},{value:".ncoJson",label:".ncoJson - Download a UTF-8 NCO lvl=2 JSON file with COARDS/CF/ACDD metadata."},{value:".odvTxt",label:".odvTxt - Download longitude,latitude,time,otherColumns as an ISO-8859-1 ODV Generic Spreadsheet File (.txt)."},{value:".pdf",label:".pdf - View a standard, medium-sized .pdf image file with a graph or map."},{value:".png",label:".png - View a standard, medium-sized .png image file with a graph or map."},{value:".smallPdf",label:".smallPdf - View a small .pdf image file with a graph or map."},{value:".smallPng",label:".smallPng - View a small .png image file with a graph or map."},{value:".subset",label:".subset - View an HTML form which uses faceted search to simplify picking subsets of the data."},{value:".transparentPng",label:".transparentPng - View a .png image file (just the data, without axes, landmask, or legend)."},{value:".tsv",label:".tsv - Download a ISO-8859-1 tab-separated text table (line 1: names; line 2: units; ISO 8601 times)."},{value:".tsv0",label:".tsv0 - Download a ISO-8859-1 .tsv file without column names or units. Times are ISO 8601 strings."},{value:".tsvp",label:".tsvp - Download a ISO-8859-1 .tsv file with line 1: name (units). Times are ISO 8601 strings."},{value:".wav",label:".wav - Download a .wav audio file. All columns must be numeric and of the same type."},{value:".xhtml",label:".xhtml - View a UTF-8 XHTML (XML) file with the data in a table. Times are ISO 8601 strings."}],le=function(e){Object(k.a)(t,e);var a=Object(D.a)(t);function t(e){var n;return Object(S.a)(this,t),(n=a.call(this,e)).state={variables:[],filters:[]},n.setSelected=n.setSelected.bind(Object(_.a)(n)),n.onFiltersChanged=n.onFiltersChanged.bind(Object(_.a)(n)),n}return Object(C.a)(t,[{key:"setSelected",value:function(e){var a=this;this.setState({variables:e}),e.forEach((function(e){a.props.dataset._meta.subsetVariables.indexOf(e)>=0&&a.props.dataset.prepareSubset(e)})),this.props.onChange(e,this.state.filters)}},{key:"onFiltersChanged",value:function(e){this.setState({filters:e}),this.props.onChange&&this.props.onChange(this.state.variables,e)}},{key:"componentDidUpdate",value:function(e){e.dataset!==this.props.dataset&&this.setState({variables:[]})}},{key:"render",value:function(){var e=this,a=this.props,t=a.dataset,n=a.metadata,l=this.state.variables;if(n){var i=function(e){return{value:e,label:e,selected:l.indexOf(e)>=0}},s=l.map(i);return n._fieldnames.filter((function(e){return l.indexOf(e)<0})).map(i).forEach((function(e){return s.push(e)})),r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{component:"legend"},"Fields"),r.a.createElement(T,{dataset:t,selected:s.filter((function(e){return l.indexOf(e.value)>=0})),options:s,onChange:function(a){return e.setSelected(a?a.map((function(e){return e.value})):[])},placeholder:r.a.createElement("p",null,"Select some fields...")}),l.length>0&&r.a.createElement(W,{onFiltersChanged:this.onFiltersChanged,variables:l,metadata:n}))}return r.a.createElement("h1",null,"sorry, no metadata")}}]),t}(r.a.Component);function ie(e){var a=e.dataset,t=e.variables,n=e.filters,l=r.a.useState("__choose__"),i=Object(c.a)(l,2),s=i[0],o=i[1],u=re.map((function(e){return r.a.createElement(d.a,{key:e.value,value:e.value},e.label)}));if(!t||!t.length)return"";var h=[t.join(",")],v=[t.join(",")];n&&n.length&&(h.push(n.map((function(e){return encodeURIComponent(e.uri_component)})).join("&")),v.push(n.map((function(e){return e.uri_component})).join("&")));var f=a.getDataUrl("__choose__"===s?".htmlTable":s),b=f+h.join("&"),g=f+v.join("&"),y="https://irishmarineinstitute.github.io/zapidox/#"+b;return r.a.createElement(r.a.Fragment,null,r.a.createElement(ae.a,{variant:"h5",gutterBottom:!0},"Download Link:"),r.a.createElement(m.a,{m:1,key:"Download Format",component:"div",display:"block"},r.a.createElement(p.a,{value:s,onChange:function(e,a){o(e.target.value)}},r.a.createElement(d.a,{key:"__choose__",value:"__choose__"},"Choose Download File Format..."),u)),r.a.createElement("a",{key:"downloadLink",href:b},g),r.a.createElement(ae.a,{variant:"h5",gutterBottom:!0},"Using this query from code"),r.a.createElement("a",{key:"apidocsLink",href:y},"View API style documentation for this query"))}var se=function(e){Object(k.a)(t,e);var a=Object(D.a)(t);function t(e){var n;return Object(S.a)(this,t),(n=a.call(this,e)).onChange=function(e,a){var t=this.state,n=t.dataset,r=t.queryno,l=[e.join(",")];a&&a.length&&l.push(a.map((function(e){return encodeURIComponent(e.uri_component)})).join("&")),l.push(encodeURIComponent('orderByLimit("5")'));var i=l.join("&"),s=r+1;this.setState({variables:e,filters:a,queryno:s,data:[]}),n.fetchData(i).then(this.onDataFetched.bind(this,s)).catch(this.noDataFetched.bind(this,s))},n.onDataFetched=function(e,a){this.state.queryno===e&&this.setState({data:a})},n.noDataFetched=function(e,a){this.state.queryno===e&&this.setState({data:[]})},n.state={dataset:!1,metadata:!1,data:[],variables:[],filters:[],queryno:0},n.onChange=Object(ne.debounce)(n.onChange.bind(Object(_.a)(n)),500),n.onDataFetched=n.onDataFetched.bind(Object(_.a)(n)),n.noDataFetched=n.noDataFetched.bind(Object(_.a)(n)),n}return Object(C.a)(t,[{key:"componentDidUpdate",value:function(e){if(e.dataset_id!==this.props.dataset_id){if(this.setState({dataset:!1,metadata:!1,data:[],variables:[]}),"0"===this.props.dataset_id)return;var a=this.props.erddap.dataset(this.props.dataset_id);a.fetchMetadata().then(function(e){this.setState({dataset:a,metadata:e,data:[]})}.bind(this))}}},{key:"render",value:function(){var e=this.props.dataset_id,a=this.state,t=a.dataset,n=a.metadata,l=a.data,i=a.variables,s=a.filters;return"0"!==e&&e?t?r.a.createElement(r.a.Fragment,null,r.a.createElement(le,{onChange:this.onChange,dataset:t,metadata:n}),r.a.createElement(te,{data:l,variables:i}),r.a.createElement(ie,{variables:i,filters:s,dataset:t})):r.a.createElement("div",null,"loading ",e):r.a.createElement("div",null)}}]),t}(r.a.Component),oe=function(e){Object(k.a)(t,e);var a=Object(D.a)(t);function t(e){var n;return Object(S.a)(this,t),(n=a.call(this,e)).state={server:e.server||"https://erddap.marine.ie/erddap/",datasets:[],dataset:0},n.onDatasetChanged=n.onDatasetChanged.bind(Object(_.a)(n)),n}return Object(C.a)(t,[{key:"onDatasetChanged",value:function(e){this.setState({dataset:e.target.value})}},{key:"componentDidMount",value:function(){var e=this,a=new O(this.state.server);this.setState({erddap:a}),a.listDatasets().then((function(a){e.setState({datasets:a})}))}},{key:"render",value:function(){var e=this.state,a=e.datasets,t=e.erddap,n=e.dataset,l=a.map((function(e){return r.a.createElement(d.a,{key:e,value:e},e)})),i=a&&a.length?"Choose...":"Loading...";return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{display:"block"},r.a.createElement(h.a,{component:"fieldset",margin:"dense"},r.a.createElement(v.a,{component:"legend"},"Dataset"),r.a.createElement(p.a,{value:n,onChange:this.onDatasetChanged},r.a.createElement(d.a,{value:"0",key:"choose...",selected:!0},i),l))),r.a.createElement(se,{erddap:t,dataset_id:n}))}}]),t}(r.a.Component),ue=new O;function ce(e){var a=Object(n.useState)([]),t=Object(c.a)(a,2),l=t[0],i=t[1],s=Object(n.useState)("choose"),f=Object(c.a)(s,2),b=f[0],g=f[1],y=Object(n.useState)(!1),w=Object(c.a)(y,2),E=w[0],O=w[1],S=window.location.protocol.substring(0,window.location.protocol.length-1);Object(n.useEffect)((function(){if(!E){function e(){return(e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue.fetchAwesomeErddaps().then((function(e){i(e.filter((function(e){return e.public&&e.url.startsWith(S)})))}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}O(!0),function(){e.apply(this,arguments)}()}}));var C=l.map((function(e){return r.a.createElement(d.a,{key:e.short_name,value:e.url},e.name)})),_="choose"===b?"":r.a.createElement(oe,{key:b,server:b});return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{display:"block"},r.a.createElement(h.a,{component:"fieldset",margin:"dense"},r.a.createElement(v.a,{component:"legend"},"Erddap Server"),r.a.createElement(p.a,{value:b,onChange:function(e){g(e.target.value)}},r.a.createElement(d.a,{value:"choose",key:"choose...",selected:!0},"Choose..."),C))),_)}var de=t(17),me=t(190),he=t(95),ve=t(191);var pe=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(me.a,null),r.a.createElement(ve.a,null,r.a.createElement(de.a,{utils:he.a},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(ce,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[116,1,2]]]);
//# sourceMappingURL=main.f473bd8c.chunk.js.map