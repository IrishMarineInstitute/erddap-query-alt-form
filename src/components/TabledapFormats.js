const options = [
  {
    "value": ".asc",
    "label": ".asc - View OPeNDAP-style ISO-8859-1 comma-separated text."
  },
  {
    "value": ".csv",
    "label": ".csv - Download a ISO-8859-1 comma-separated text table (line 1: names; line 2: units; ISO 8601 times)."
  },
  {
    "value": ".csv0",
    "label": ".csv0 - Download a ISO-8859-1 .csv file without column names or units. Times are ISO 8601 strings."
  },
  {
    "value": ".csvp",
    "label": ".csvp - Download a ISO-8859-1 .csv file with line 1: name (units). Times are ISO 8601 strings."
  },
  {
    "value": ".das",
    "label": ".das - View the dataset's metadata via an ISO-8859-1 OPeNDAP Dataset Attribute Structure (DAS)."
  },
  {
    "value": ".dds",
    "label": ".dds - View the dataset's structure via an ISO-8859-1 OPeNDAP Dataset Descriptor Structure (DDS)."
  },
  {
    "value": ".dods",
    "label": ".dods - OPeNDAP clients use this to download the data in the DODS binary format."
  },
  {
    "value": ".esriCsv",
    "label": ".esriCsv - Download a ISO_8859_1 .csv file for ESRI's ArcGIS 9.x and below (separate date and time columns)."
  },
  {
    "value": ".fgdc",
    "label": ".fgdc - View the dataset's UTF-8 FGDC .xml metadata."
  },
  {
    "value": ".geoJson",
    "label": ".geoJson - Download longitude,latitude,otherColumns data as a UTF-8 GeoJSON .json file."
  },
  {
    "value": ".graph",
    "label": ".graph - View a Make A Graph web page."
  },
  {
    "value": ".help",
    "label": ".help - View a web page with a description of tabledap."
  },
  {
    "value": ".html",
    "label": ".html - View an OPeNDAP-style HTML Data Access Form."
  },
  {
    "value": ".htmlTable",
    "label": ".htmlTable - View a UTF-8 .html web page with the data in a table. Times are ISO 8601 strings."
  },
  {
    "value": ".iso19115",
    "label": ".iso19115 - View the dataset's ISO 19115-2/19139 UTF-8 .xml metadata."
  },
  {
    "value": ".itx",
    "label": ".itx - Download an ISO-8859-1 Igor Text File. Each response column becomes a wave."
  },
  {
    "value": ".json",
    "label": ".json - View a table-like UTF-8 JSON file (missing value = 'null'; times are ISO 8601 strings)."
  },
  {
    "value": ".jsonlCSV",
    "label": ".jsonlCSV - View a UTF-8 JSON Lines CSV file (missing value = 'null'; times are ISO 8601 strings)."
  },
  {
    "value": ".jsonlKVP",
    "label": ".jsonlKVP - View a UTF-8 JSON Lines file with Key:Value pairs (missing value = 'null'; times are ISO 8601 strings)."
  },
  {
    "value": ".kml",
    "label": ".kml - View a .kml file, suitable for Google Earth."
  },
  {
    "value": ".largePdf",
    "label": ".largePdf - View a large .pdf image file with a graph or map."
  },
  {
    "value": ".largePng",
    "label": ".largePng - View a large .png image file with a graph or map."
  },
  {
    "value": ".mat",
    "label": ".mat - Download a MATLAB binary file."
  },
  {
    "value": ".nc",
    "label": ".nc - Download a flat, table-like, NetCDF-3 binary file with COARDS/CF/ACDD metadata."
  },
  {
    "value": ".ncCF",
    "label": ".ncCF - Download a NetCDF-3 CF Discrete Sampling Geometries file (Contiguous Ragged Array)."
  },
  {
    "value": ".ncCFHeader",
    "label": ".ncCFHeader - View the UTF-8 header (the metadata) for the .ncCF file."
  },
  {
    "value": ".ncCFMA",
    "label": ".ncCFMA - Download a NetCDF-3 CF Discrete Sampling Geometries file (Multidimensional Array)."
  },
  {
    "value": ".ncCFMAHeader",
    "label": ".ncCFMAHeader - View the UTF-8 header (the metadata) for the .ncCFMA file."
  },
  {
    "value": ".ncHeader",
    "label": ".ncHeader - View the UTF-8 header (the metadata) for the NetCDF-3 .nc file."
  },
  {
    "value": ".nccsv",
    "label": ".nccsv - Download a NetCDF-3-like 7-bit ASCII NCCSV .csv file with COARDS/CF/ACDD metadata."
  },
  {
    "value": ".nccsvMetadata",
    "label": ".nccsvMetadata - View the dataset's metadata as the top half of a 7-bit ASCII NCCSV .csv file."
  },
  {
    "value": ".ncoJson",
    "label": ".ncoJson - Download a UTF-8 NCO lvl=2 JSON file with COARDS/CF/ACDD metadata."
  },
  {
    "value": ".odvTxt",
    "label": ".odvTxt - Download longitude,latitude,time,otherColumns as an ISO-8859-1 ODV Generic Spreadsheet File (.txt)."
  },
  {
    "value": ".pdf",
    "label": ".pdf - View a standard, medium-sized .pdf image file with a graph or map."
  },
  {
    "value": ".png",
    "label": ".png - View a standard, medium-sized .png image file with a graph or map."
  },
  {
    "value": ".smallPdf",
    "label": ".smallPdf - View a small .pdf image file with a graph or map."
  },
  {
    "value": ".smallPng",
    "label": ".smallPng - View a small .png image file with a graph or map."
  },
  {
    "value": ".subset",
    "label": ".subset - View an HTML form which uses faceted search to simplify picking subsets of the data."
  },
  {
    "value": ".transparentPng",
    "label": ".transparentPng - View a .png image file (just the data, without axes, landmask, or legend)."
  },
  {
    "value": ".tsv",
    "label": ".tsv - Download a ISO-8859-1 tab-separated text table (line 1: names; line 2: units; ISO 8601 times)."
  },
  {
    "value": ".tsv0",
    "label": ".tsv0 - Download a ISO-8859-1 .tsv file without column names or units. Times are ISO 8601 strings."
  },
  {
    "value": ".tsvp",
    "label": ".tsvp - Download a ISO-8859-1 .tsv file with line 1: name (units). Times are ISO 8601 strings."
  },
  {
    "value": ".wav",
    "label": ".wav - Download a .wav audio file. All columns must be numeric and of the same type."
  },
  {
    "value": ".xhtml",
    "label": ".xhtml - View a UTF-8 XHTML (XML) file with the data in a table. Times are ISO 8601 strings."
  }
];

export default options;