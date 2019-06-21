# Eau Claire Energy Freeboard Custom

This is a fork of the original Freeboard repository with some custom changes.

## Loading Specific Dashboard

To load a pre-made dashboard on startup, make sure the dashboard file is in the directory with the index.html file. The use: 

```
/index.html#source=dashboard.json

```

## Plugins

* Tables - the Freeboard Table plugin available at: https://github.com/leon-van-dongen/freeboard-table is installed and modified slightly to better format the layout of the tables.
* Indicator List - this is a modification to the existing indicator widiget. The difference here is that the status of the indicator can be good/bad/nothing as indicated by the text in those fields. A JSON feed (or datasource) is parsed to display a list with the appropriate red/green color scheme. The JSON must be formatted like this: 

```
[
  {"status":"the status","description":"Description to display"},
  {......}
]
```
