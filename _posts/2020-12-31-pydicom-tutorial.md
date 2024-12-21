---
layout: post
title:  "Introduction to Pydicom"
date:   2020-12-31
title_include: true
categories: blog
image_url: /assets/img/pydicom-tutorial/cover.png
---

[PyDICOM Website](https://pydicom.github.io/)

Code can be found @ [Github](https://github.com/Ujjwal-9/medical-training/tree/master/dicom-demo). Checkout `dicom-viewer.ipynb`

# Abstract

Pydicom is a pure Python package for working with DICOM files. It lets you read, modify and write DICOM data in an easy "pythonic" way.


# Introduction

**Installation**

Using pip: 
```bash
$ pip install pydicom
```

Using conda: 
```bash
$ conda install -c conda-forge pydicom
```

Pydicom comes with its own set of dicom images which can be used to go through examples.

They also give `get_dataset.py` file to download datasets, which is also included in the [github repo](https://github.com/Ujjwal-9/medical-training/tree/master/dicom-demo).

```bash
$ python get_datasets.py --show
$ python get_datasets.py --output {path}
```


# Tutorial
```python
def load_scan(path):
    slices = [pydicom.dcmread(path + '/' + s) for s in               
              os.listdir(path)]
    slices = [s for s in slices if 'SliceLocation' in s]
    slices.sort(key = lambda x: int(x.InstanceNumber))
    try:
        slice_thickness = np.abs(slices[0].ImagePositionPatient[2] -   
                          slices[1].ImagePositionPatient[2])
    except:
        slice_thickness = np.abs(slices[0].SliceLocation - 
                          slices[1].SliceLocation)
    for s in slices:
        s.SliceThickness = slice_thickness
    return slices
```
`load_scan` loads the dicom files and sorts them according to their `Instance Number`. It also extracts slice thickness which is a very important parameter in these scans as it is indicative of resolution of the scans. Lower the slice thickness, better the resolution.


**Slice Thickness**

> Slice thickness directly impacts the precision of target localization during treatment.

<figure>
<img src="https://i.sstatic.net/Cx1ri.png">
<figcaption>Slice Increment and Slice Thickness</figcaption>
</figure>

Slice Increment/Spacing refers to the movement of the table/scanner for scanning the next slice.

> If slice thickness is greater than slice increment than there is anatomical information loss.

If there is overlap between 2 adjacent slices that is `slice thickness > slice increment` than such cases acts as error correction.

**HU Scaling**

```python
def get_pixels_hu(scans):
    image = np.stack([s.pixel_array for s in scans])
    image = image.astype(np.int16)
    
    # Convert to Hounsfield units (HU)
    slope = scans[0].RescaleSlope
    
    if slope != 1:
        image = slope * image.astype(np.float64)
        image = image.astype(np.int16)
        
    image += np.int16(scans[0].RescaleIntercept)
    
    return np.array(image, dtype=np.int16)
```

HU scaling is explained in my [dicom standard blog](http://ujjwal9.ml/blog/medicine/2020/12/28/dicom-intro.html). 

**Multiplanar reconstruction**
{% maincolumn 'https://images.ctfassets.net/cnu0m8re1exe/1k0YS9HKpsyurGlnI1Zlky/223cbf9b658b7068925ba7f944a9bb39/sagittal.jpg' 'Multiplanar view of brain.' %}


```python
slices = sorted(patient_dicom, key=lambda s: s.SliceLocation)

# pixel aspects, assuming all slices are the same
pixel_spacing = slices[0].PixelSpacing
slice_thickness = slices[0].SliceThickness
ax_aspect = pixel_spacing[1]/pixel_spacing[0]
sag_aspect = pixel_spacing[1]/slice_thickness
cor_aspect = slice_thickness/pixel_spacing[0]

# create 3D array
img_shape = list(slices[0].pixel_array.shape)
img_shape.append(len(slices))
img3d = np.zeros(img_shape)

# fill 3D array with the images from the files
for i, s in enumerate(slices):
    img2d = s.pixel_array
    img3d[:, :, i] = img2d
    
# print(img3d.shape)

# plot 3 orthogonal slices
a1 = plt.subplot(1, 3, 1)
a1.axis('off')
plt.imshow(img3d[:, :, img_shape[2]//2], cmap='gray')
a1.set_aspect(ax_aspect)

a2 = plt.subplot(1, 3, 2)
a2.axis('off')
plt.imshow(img3d[:, img_shape[1]//2, :], cmap='gray')
a2.set_aspect(sag_aspect)

a3 = plt.subplot(1, 3, 3)
a3.axis('off')
plt.imshow(img3d[img_shape[0]//2, :, :].T, cmap='gray')
a3.set_aspect(cor_aspect)
```
<figure>
<img src="/assets/img/pydicom-tutorial/mpr.png">
<figcaption>Multiplanar reformation - axial, sagittal and coronal view</figcaption>
</figure>

{% epigraph "Multiplanar reformation or reconstruction (MPR) involves the process of converting data from an imaging modality acquired in a certain plane, usually axial, into another plane. It is most commonly performed with thin-slice data from volumetric CT in the axial plane, but it may be accomplished with scanning in any plane and whichever modality capable of cross-sectional imaging, including magnetic resonance imaging (MRI), PET and SPECT." "Source" "https://radiopaedia.org/articles/multiplanar-reformation-mpr?lang=us" %}


**Windowing**

```python
level = dicom_file.WindowCenter
width = dicom_file.WindowWidth
# ...or set window/level manually to values you want
vmin = level - width/2
vmax = level + width/2
plt.imshow(hu_pixels, cmap='gray', vmin=vmin, vmax=vmax)
plt.show()
```

{% maincolumn 'assets/img/pydicom-tutorial/windowing-org.png' 'Without Windowing.' %}
{% maincolumn 'assets/img/pydicom-tutorial/windowing-new.png' 'With Windowing.' %}
{% maincolumn 'https://www.stepwards.com/wp-content/uploads/2019/12/Screen-Shot-2019-10-06-at-8.45.17-PM-e1577078248771.jpg' 'Windows for various scans.' %}

> Brain windows are useful for evaluation of brain hemorrhage, fluid-filled structures including blood vessels and ventricles, and air-filled spaces.

> Bone windows are useful for evaluation in the setting of trauma. 


# References

["Martin J. Murphy. The importance of computed tomography slice thickness in radiographic patient positioning for radiosurgery. "](https://doi.org/10.1118/1.598500)

["What is the difference between slice thickness and slice increment?"](https://www.materialise.com/en/faq/what-difference-between-slice-thickness-and-slice-increment#:~:text=Slice%20thickness%20and%20slice%20increment%20are%20central%20concepts%20that%20surround,4%20mm%20in%20the%20illustration)

["Hounsfield Scale"](https://www.sciencedirect.com/topics/medicine-and-dentistry/hounsfield-scale)

["Usefulness of hounsfield unit and density in the assessment and treatment of urinary stones"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4220362/)

["Multiplanar reformation (MPR)". Dr Daniel J Bell and Dr Francis Fortin et al. radiopaedia.org](https://radiopaedia.org/articles/multiplanar-reformation-mpr?lang=us)


> **Follow me on twitter [@theujjwal9](https://twitter.com/theujjwal9)**