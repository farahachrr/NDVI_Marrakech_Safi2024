var roi = table;
Map.centerObject(roi, 7);
Map.addLayer(roi, {}, 'Marrakech–Safi');
// --- NDVI 2024 (Landsat 8) ---
var start = '2024-03-01';
var end   = '2024-05-31';

function ndviL8(img){
  return img.normalizedDifference(['SR_B5','SR_B4']).rename('NDVI');
}

var ndvi2024 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(roi)
  .filterDate(start, end)
  .map(ndviL8)
  .median()
  .clip(roi);

Map.addLayer(ndvi2024, {min:-0.2, max:0.8}, 'NDVI 2024');

Export.image.toDrive({
  image: ndvi2024,
  description: 'NDVI_2024_MarrakechSafi',
  fileNamePrefix: 'NDVI_2024_MarrakechSafi',
  region: roi.geometry(),
  scale: 30,
  maxPixels: 1e13
});
