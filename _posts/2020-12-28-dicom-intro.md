---
layout: post
title:  "DICOM Standards"
date:   2020-12-28
title_include: true
categories: blog
image_url: /assets/img/dicom-intro/dicom-arch.png
---
[DICOM Website!](https://www.dicomstandard.org/)

**DICOM = Digital Imaging and Communications in Medicine**

The DICOM standard includes a file format definition and a network communications protocol that uses TCP/IP to communicate between systems.


<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  <!-- tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}, -->
  jax: ["input/TeX","output/HTML-CSS"],
  displayAlign: "left",
  "HTML-CSS": { scale: 110}
});
</script>

# Abstract

The DICOM standard was conceptualized and implemented when CT (computed tomography) scans were developed. It takes special care not to lose information when translating medical images and other data to digital format. This is done to keep it as close to the original as possible.

> The main objective of this new standard was to create an open platform for the communication of medical images and related data.


# Introduction

The contents of the DICOM standard go far beyond a definition of an exchange format for medical image data.

DICOM defines:

1. Data structures (formats) for medical images and related data
2. Network-oriented services, e.g.:
+ Image transmission
+ Query of an image archive (PACS)
+ Print (hardcopy)
+ RIS - PACS - modality integration
3. Formats for storage media exchange
4. Requirements for conforming devices and programs

<img src="/assets/img/dicom-intro/dicom-workflow.png" width=600> {% marginnote "sidenote-id" "[[Image Source]](https://www.softneta.com/solutions/dicom-anonymization-for-medical-education-and-research/)" %}



> PACS (Picture Archiving and Communication System) provides economical storage of, and convenient access to, images from multiple modalities (source machine types).


> RIS (Radiology Information System) is a computerized database used by radiology departments to store, manipulate, and distribute patient radiological data and imagery.


<img src="/assets/img/dicom-intro/dicom-protocol-workflow.png" width=600> {% marginnote "sidenote-id" "[[Image Source]](https://www.extrahop.com/company/blog/2016/introduction-to-dicom-protocol/)" %}

PACS-RIS integration improves the flow of images for radiologists. They communicate using a set of commands (called HL7) concerned with Admission/Discharge/Transfer (ADT) and Order/Entry.

## DICOM Data Structures

DICOM consists of a list of image attributes which contain vast amounts of image and medical information:
- Patient information (name, sex, identification number)
- Modality and imaging procedure information (device parameters, calibration, radiation dose, contrast media)
- Image information (resolution, windowing)

DICOM goes to great lengths and defines the significance of each data element in a multitude of cases. It defines if an attribute is required, optional, or important for certain cases. But this feature comes at a cost:
1. Image objects are frequently incomplete: There is inconsistency in filling all the fields with data. Some fields in image objects are often left blank and some are filled with incorrect data.
2. Another problem occurs when displaying an image on a device made by a different manufacturer, because different imaging equipment uses different amplitude ranges and the same number of allocated bits. In that case, images can be displayed as underexposed or overexposed with poor contrast, so those parameters should be adjusted manually.

## DICOM Network Services

This service is based on the client-server concept. DICOM applications establish connections to exchange information. In addition to image transmission, there are other features:

- Image Archive Service: Search images in a PACS archive by certain criteria (patient, time of creation of the images, modality etc.) and selectively download images from this archive
- Print Service: Gives access to cameras and printers over a network
- Modality Worklist Service: Download updated information regarding patients using the above-described PACS-RIS system

### Patient Model

Queries to image archives (PACS) are made in 4 levels of DICOM hierarchy:
<figure>
<svg width="300" height="300" viewBox="0 0 596 1628" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<rect x="4" width="588" height="252" fill="white"/>
<rect x="4.5" y="0.5" width="587" height="251" stroke="black"/>
</g>
<path d="M123.641 92.8C129.465 92.8 134.521 93.76 138.809 95.68C143.161 97.6 146.489 100.352 148.793 103.936C151.097 107.52 152.249 111.776 152.249 116.704C152.249 121.568 151.097 125.824 148.793 129.472C146.489 133.056 143.161 135.808 138.809 137.728C134.521 139.648 129.465 140.608 123.641 140.608H108.473V160H95.9928V92.8H123.641ZM123.065 130.048C128.505 130.048 132.633 128.896 135.449 126.592C138.265 124.288 139.673 120.992 139.673 116.704C139.673 112.416 138.265 109.12 135.449 106.816C132.633 104.512 128.505 103.36 123.065 103.36H108.473V130.048H123.065ZM204.921 144.448H171.321L164.697 160H151.832L182.073 92.8H194.361L224.697 160H211.641L204.921 144.448ZM200.792 134.656L188.121 105.28L175.545 134.656H200.792ZM243.5 103.36H221.228V92.8H278.252V103.36H255.98V160H243.5V103.36ZM287.618 92.8H300.098V160H287.618V92.8ZM368.674 149.536V160H318.274V92.8H367.33V103.264H330.754V120.736H363.202V131.008H330.754V149.536H368.674ZM442.299 92.8V160H432.027L394.971 114.496V160H382.587V92.8H392.859L429.915 138.304V92.8H442.299ZM473.937 103.36H451.665V92.8H508.689V103.36H486.417V160H473.937V103.36Z" fill="black"/>
<g filter="url(#filter1_d)">
<rect x="4" y="456" width="588" height="252" fill="white"/>
<rect x="4.5" y="456.5" width="587" height="251" stroke="black"/>
</g>
<path d="M162.059 616.96C156.875 616.96 151.851 616.224 146.987 614.752C142.187 613.28 138.379 611.328 135.563 608.896L139.883 599.2C142.635 601.376 145.995 603.168 149.963 604.576C153.995 605.92 158.027 606.592 162.059 606.592C167.051 606.592 170.763 605.792 173.195 604.192C175.691 602.592 176.939 600.48 176.939 597.856C176.939 595.936 176.235 594.368 174.827 593.152C173.483 591.872 171.755 590.88 169.643 590.176C167.531 589.472 164.651 588.672 161.003 587.776C155.883 586.56 151.723 585.344 148.523 584.128C145.387 582.912 142.667 581.024 140.363 578.464C138.123 575.84 137.003 572.32 137.003 567.904C137.003 564.192 137.995 560.832 139.979 557.824C142.027 554.752 145.067 552.32 149.099 550.528C153.195 548.736 158.187 547.84 164.075 547.84C168.171 547.84 172.203 548.352 176.171 549.376C180.139 550.4 183.563 551.872 186.443 553.792L182.507 563.488C179.563 561.76 176.491 560.448 173.291 559.552C170.091 558.656 166.987 558.208 163.979 558.208C159.051 558.208 155.371 559.04 152.939 560.704C150.571 562.368 149.387 564.576 149.387 567.328C149.387 569.248 150.059 570.816 151.403 572.032C152.811 573.248 154.571 574.208 156.683 574.912C158.795 575.616 161.675 576.416 165.323 577.312C170.315 578.464 174.411 579.68 177.611 580.96C180.811 582.176 183.531 584.064 185.771 586.624C188.075 589.184 189.227 592.64 189.227 596.992C189.227 600.704 188.203 604.064 186.155 607.072C184.171 610.08 181.131 612.48 177.035 614.272C172.939 616.064 167.947 616.96 162.059 616.96ZM214.297 559.36H192.025V548.8H249.049V559.36H226.777V616H214.297V559.36ZM286.092 616.96C276.812 616.96 269.58 614.368 264.396 609.184C259.212 603.936 256.62 596.448 256.62 586.72V548.8H269.1V586.24C269.1 599.424 274.796 606.016 286.188 606.016C297.516 606.016 303.18 599.424 303.18 586.24V548.8H315.468V586.72C315.468 596.448 312.876 603.936 307.692 609.184C302.572 614.368 295.372 616.96 286.092 616.96ZM332.946 548.8H362.322C369.49 548.8 375.858 550.208 381.426 553.024C386.994 555.776 391.314 559.712 394.386 564.832C397.458 569.888 398.994 575.744 398.994 582.4C398.994 589.056 397.458 594.944 394.386 600.064C391.314 605.12 386.994 609.056 381.426 611.872C375.858 614.624 369.49 616 362.322 616H332.946V548.8ZM361.746 605.44C366.674 605.44 370.994 604.512 374.706 602.656C378.482 600.736 381.362 598.048 383.346 594.592C385.394 591.072 386.418 587.008 386.418 582.4C386.418 577.792 385.394 573.76 383.346 570.304C381.362 566.784 378.482 564.096 374.706 562.24C370.994 560.32 366.674 559.36 361.746 559.36H345.426V605.44H361.746ZM438.344 592.288V616H425.864V592.48L399.464 548.8H412.808L432.488 581.536L452.36 548.8H464.648L438.344 592.288Z" fill="black"/>
<g filter="url(#filter2_d)">
<rect x="4" y="912" width="588" height="252" fill="white"/>
<rect x="4.5" y="912.5" width="587" height="251" stroke="black"/>
</g>
<path d="M152.731 1072.96C147.547 1072.96 142.523 1072.22 137.659 1070.75C132.859 1069.28 129.051 1067.33 126.235 1064.9L130.555 1055.2C133.307 1057.38 136.667 1059.17 140.635 1060.58C144.667 1061.92 148.699 1062.59 152.731 1062.59C157.723 1062.59 161.435 1061.79 163.867 1060.19C166.363 1058.59 167.611 1056.48 167.611 1053.86C167.611 1051.94 166.907 1050.37 165.499 1049.15C164.155 1047.87 162.427 1046.88 160.315 1046.18C158.203 1045.47 155.323 1044.67 151.675 1043.78C146.555 1042.56 142.395 1041.34 139.195 1040.13C136.059 1038.91 133.339 1037.02 131.035 1034.46C128.795 1031.84 127.675 1028.32 127.675 1023.9C127.675 1020.19 128.667 1016.83 130.651 1013.82C132.699 1010.75 135.739 1008.32 139.771 1006.53C143.867 1004.74 148.859 1003.84 154.747 1003.84C158.843 1003.84 162.875 1004.35 166.843 1005.38C170.811 1006.4 174.235 1007.87 177.115 1009.79L173.179 1019.49C170.235 1017.76 167.163 1016.45 163.963 1015.55C160.763 1014.66 157.659 1014.21 154.651 1014.21C149.723 1014.21 146.043 1015.04 143.611 1016.7C141.243 1018.37 140.059 1020.58 140.059 1023.33C140.059 1025.25 140.731 1026.82 142.075 1028.03C143.483 1029.25 145.243 1030.21 147.355 1030.91C149.467 1031.62 152.347 1032.42 155.995 1033.31C160.987 1034.46 165.083 1035.68 168.283 1036.96C171.483 1038.18 174.203 1040.06 176.443 1042.62C178.747 1045.18 179.899 1048.64 179.899 1052.99C179.899 1056.7 178.875 1060.06 176.827 1063.07C174.843 1066.08 171.803 1068.48 167.707 1070.27C163.611 1072.06 158.619 1072.96 152.731 1072.96ZM242.674 1061.54V1072H192.274V1004.8H241.33V1015.26H204.754V1032.74H237.202V1043.01H204.754V1061.54H242.674ZM300.555 1072L286.827 1052.32C286.251 1052.38 285.387 1052.42 284.235 1052.42H269.067V1072H256.587V1004.8H284.235C290.059 1004.8 295.115 1005.76 299.403 1007.68C303.755 1009.6 307.083 1012.35 309.387 1015.94C311.691 1019.52 312.843 1023.78 312.843 1028.7C312.843 1033.76 311.595 1038.11 309.099 1041.76C306.667 1045.41 303.147 1048.13 298.539 1049.92L313.995 1072H300.555ZM300.267 1028.7C300.267 1024.42 298.859 1021.12 296.042 1018.82C293.227 1016.51 289.099 1015.36 283.659 1015.36H269.067V1042.14H283.659C289.099 1042.14 293.227 1040.99 296.042 1038.69C298.859 1036.32 300.267 1032.99 300.267 1028.7ZM326.805 1004.8H339.285V1072H326.805V1004.8ZM407.862 1061.54V1072H357.462V1004.8H406.518V1015.26H369.942V1032.74H402.39V1043.01H369.942V1061.54H407.862ZM442.606 1072.96C437.422 1072.96 432.398 1072.22 427.534 1070.75C422.734 1069.28 418.926 1067.33 416.11 1064.9L420.43 1055.2C423.182 1057.38 426.542 1059.17 430.51 1060.58C434.542 1061.92 438.574 1062.59 442.606 1062.59C447.598 1062.59 451.31 1061.79 453.742 1060.19C456.238 1058.59 457.486 1056.48 457.486 1053.86C457.486 1051.94 456.782 1050.37 455.374 1049.15C454.03 1047.87 452.302 1046.88 450.19 1046.18C448.078 1045.47 445.198 1044.67 441.55 1043.78C436.43 1042.56 432.27 1041.34 429.07 1040.13C425.934 1038.91 423.214 1037.02 420.91 1034.46C418.67 1031.84 417.55 1028.32 417.55 1023.9C417.55 1020.19 418.542 1016.83 420.526 1013.82C422.574 1010.75 425.614 1008.32 429.646 1006.53C433.742 1004.74 438.734 1003.84 444.622 1003.84C448.718 1003.84 452.75 1004.35 456.718 1005.38C460.686 1006.4 464.11 1007.87 466.99 1009.79L463.054 1019.49C460.11 1017.76 457.038 1016.45 453.838 1015.55C450.638 1014.66 447.534 1014.21 444.526 1014.21C439.598 1014.21 435.918 1015.04 433.486 1016.7C431.118 1018.37 429.934 1020.58 429.934 1023.33C429.934 1025.25 430.606 1026.82 431.95 1028.03C433.358 1029.25 435.118 1030.21 437.23 1030.91C439.342 1031.62 442.222 1032.42 445.87 1033.31C450.862 1034.46 454.958 1035.68 458.158 1036.96C461.358 1038.18 464.078 1040.06 466.318 1042.62C468.622 1045.18 469.774 1048.64 469.774 1052.99C469.774 1056.7 468.75 1060.06 466.702 1063.07C464.718 1066.08 461.678 1068.48 457.582 1070.27C453.486 1072.06 448.494 1072.96 442.606 1072.96Z" fill="black"/>
<g filter="url(#filter3_d)">
<rect x="4" y="1368" width="588" height="252" fill="white"/>
<rect x="4.5" y="1368.5" width="587" height="251" stroke="black"/>
</g>
<path d="M54.0865 1460.8H66.5665V1528H54.0865V1460.8ZM144.455 1460.8V1528H134.183L97.1268 1482.5V1528H84.7428V1460.8H95.0148L132.071 1506.3V1460.8H144.455ZM183.294 1528.96C178.11 1528.96 173.086 1528.22 168.222 1526.75C163.422 1525.28 159.614 1523.33 156.798 1520.9L161.118 1511.2C163.87 1513.38 167.23 1515.17 171.198 1516.58C175.23 1517.92 179.262 1518.59 183.294 1518.59C188.286 1518.59 191.998 1517.79 194.43 1516.19C196.926 1514.59 198.174 1512.48 198.174 1509.86C198.174 1507.94 197.47 1506.37 196.062 1505.15C194.718 1503.87 192.99 1502.88 190.878 1502.18C188.766 1501.47 185.886 1500.67 182.238 1499.78C177.118 1498.56 172.958 1497.34 169.758 1496.13C166.622 1494.91 163.902 1493.02 161.598 1490.46C159.358 1487.84 158.238 1484.32 158.238 1479.9C158.238 1476.19 159.23 1472.83 161.214 1469.82C163.262 1466.75 166.302 1464.32 170.334 1462.53C174.43 1460.74 179.422 1459.84 185.31 1459.84C189.406 1459.84 193.438 1460.35 197.406 1461.38C201.374 1462.4 204.798 1463.87 207.677 1465.79L203.742 1475.49C200.798 1473.76 197.726 1472.45 194.526 1471.55C191.326 1470.66 188.222 1470.21 185.214 1470.21C180.286 1470.21 176.606 1471.04 174.174 1472.7C171.806 1474.37 170.622 1476.58 170.622 1479.33C170.622 1481.25 171.294 1482.82 172.638 1484.03C174.046 1485.25 175.806 1486.21 177.918 1486.91C180.03 1487.62 182.91 1488.42 186.558 1489.31C191.55 1490.46 195.646 1491.68 198.846 1492.96C202.046 1494.18 204.766 1496.06 207.006 1498.62C209.31 1501.18 210.462 1504.64 210.462 1508.99C210.462 1512.7 209.438 1516.06 207.39 1519.07C205.406 1522.08 202.366 1524.48 198.27 1526.27C194.174 1528.06 189.182 1528.96 183.294 1528.96ZM235.531 1471.36H213.259V1460.8H270.283V1471.36H248.011V1528H235.531V1471.36ZM319.858 1512.45H286.258L279.634 1528H266.77L297.01 1460.8H309.298L339.634 1528H326.578L319.858 1512.45ZM315.73 1502.66L303.058 1473.28L290.482 1502.66H315.73ZM407.892 1460.8V1528H397.62L360.564 1482.5V1528H348.18V1460.8H358.452L395.508 1506.3V1460.8H407.892ZM457.003 1528.96C450.219 1528.96 444.075 1527.49 438.571 1524.54C433.131 1521.54 428.843 1517.41 425.707 1512.16C422.635 1506.91 421.099 1500.99 421.099 1494.4C421.099 1487.81 422.667 1481.89 425.803 1476.64C428.939 1471.39 433.227 1467.3 438.667 1464.35C444.171 1461.34 450.315 1459.84 457.099 1459.84C462.603 1459.84 467.627 1460.8 472.171 1462.72C476.715 1464.64 480.555 1467.42 483.691 1471.07L475.627 1478.66C470.763 1473.41 464.779 1470.78 457.675 1470.78C453.067 1470.78 448.939 1471.81 445.291 1473.86C441.643 1475.84 438.795 1478.62 436.747 1482.21C434.699 1485.79 433.675 1489.86 433.675 1494.4C433.675 1498.94 434.699 1503.01 436.747 1506.59C438.795 1510.18 441.643 1512.99 445.291 1515.04C448.939 1517.02 453.067 1518.02 457.675 1518.02C464.779 1518.02 470.763 1515.36 475.627 1510.05L483.691 1517.73C480.555 1521.38 476.683 1524.16 472.075 1526.08C467.531 1528 462.507 1528.96 457.003 1528.96ZM546.049 1517.54V1528H495.649V1460.8H544.705V1471.26H508.129V1488.74H540.577V1499.01H508.129V1517.54H546.049Z" fill="black"/>
<line x1="295.5" y1="456.479" x2="295.5" y2="252" stroke="black" stroke-width="5"/>
<line x1="295.5" y1="912.48" x2="295.5" y2="708.001" stroke="black" stroke-width="5"/>
<line x1="295.5" y1="1368.48" x2="295.5" y2="1164" stroke="black" stroke-width="5"/>
<defs>
<filter id="filter0_d" x="0" y="0" width="596" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="0" y="456" width="596" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="0" y="912" width="596" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter3_d" x="0" y="1368" width="596" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
<figcaption>DICOM Data Model</figcaption>
</figure>

Patient has  studies, studies have series which are scans and scans may have multiple instances or images (which are slices in CT scans).

**Patient Level**
- How many studies are there for this patient
- How many Series are there for this patient (in all studies)
- How many Instances (images) are there for this patient (in all series)

**Study Level** (Patient and Study roots)
- How many Series are there in this study
- How many Instances (images) are there in this study (in all series)

**Series Level**
- How many Instances (images) are there in this series

**Instance Level**


{% marginnote 'table-1-id' "Table is sourced from [here](https://www.medicalconnections.co.uk/kb/counting-studies-series-and-instances/)" %}
<div class="table-wrapper">
<table class="booktabs">
<thead>
<tr>
<th>Attribute Name</th>
<th>Tag</th>
<th>Attribute Description</th>
</tr>
</thead>

<tbody>
<tr>
<td>Number of Patient Related Studies</td>
<td>(0020,1200)</td>
<td>The number of studies that match the Patient level Query/Retrieve search criteria</td>
</tr>

<tr>
<td>Number of Patient Related Series</td>
<td>(0020,1202)</td>
<td>The number of series that match the Patient level Query/Retrieve search criteria</td>
</tr>

<tr>
<td>Number of Patient Related Instances</td>
<td>(0020,1204)</td>
<td>The number of composite object instances that match the Patient level Query/Retrieve search criteria</td>
</tr>

<tr>
<td>Number of Study Related Series</td>
<td>(0020,1206)</td>
<td>The number of series that match the Study level Query/Retrieve search criteria</td>
</tr>

<tr>
<td>Number of Study Related Instances</td>
<td>(0020,1208)</td>
<td>The number of composite object instances that match the Study level Query/Retrieve search criteria</td>
</tr>

<tr>
<td>Number of Series Related Instances</td>
<td>(0020,1209)</td>
<td>The number of composite object instances in a Series that match the Series level Query/Retrieve search criteria</td>
</tr>

<tr>
<td>SOP Classes in Study</td>
<td>(0008,0062)</td>
<td>The SOP Classes contained in the Study.</td>
</tr>
</tbody>
</table>

</div>


## Media Exchange

DICOM defines **application profiles** which defines how media is exchanged:
- Encoding formats and compression schemes used (e. g. only uncompressed or loss-less JPEG)
- Storage medium used
- Images from which modalities may be present on the medium (X-Ray Angiography images, etc)

DICOM directory: each dicom medium contains this directory which contains information (patient name, modality, unique identifiers etc.) for all images which are captured on the medium. 

## Device Conformance

Each DICOM supporting device must also specify which DICOM services and options are supported, which extensions and peculiarities have been implemented by the vendor, and how the device communicates with other DICOM systems.


# DICOM File Format
The DICOM standard is divided in 2 parts:

A DICOM file consists of a header and image data sets.

<img src="/assets/img/dicom-intro/packet.jpg" width=250> {% marginnote "sidenote-id" "Packet structure of dicom file." %}

**Preamble** is used to access the images and other data in DICOM file.

**Prefix** contains the string “DICM” as uppercase characters.

**Data Set** is the representation of real world information.

**Data Elements**. There are 5 types of Data elements: 
- Type 1 Required Data elements, 
- Type 1C Conditional Data Elements, 
- Type 2 Required Data Elements, 
- Type 2C Conditional Data Elements
- Type 3 optional Data Elements.


# Clinical Terms

Some clinical terms to be aware of!

## Slice Thickness

Slice thickness refers to the (often axial) resolution of the scan.

{% epigraph "Patient Position (0018, 5100) will tell you if the patient was scanned head-first supine, feet-first prone, head-first prone, etc. Instance Number (0020, 0013), also commonly known as slice number, contains no information about spatial location and isn't even guaranteed to be unique. Slice Location (0020, 1041) is useful, if it exists, but you can't count on it always existing because it's a Type 3 (optional) attribute. To have a robust solution, you need to use Image Position Patient (0020, 0032) together with Image Orientation Patient (0020, 0037) and Patient Position (0018, 5100) to properly order the slices in space. Image Position Patient gives you a vector from the origin to the center of the first transmitted pixel of the image. Image Orientation Patient gives you vectors for the orientation of the rows and columns of the image in space. Patient Position tells you how the patient was placed on the table relative to the coordinate system." 'Source' 'https://stackoverflow.com/questions/6597843/dicom-slice-ordering' %}


## Hu Scaling (Hounsfield scale)
HU is a quantitative scale for describing radiodensity. HU's is standardized across all CT scans regardless of the scanner detector. 

$$HU = 1000 * \frac{\mu - \mu_{water}}{\mu_{water} - \mu_{air}}$$

Where $$\mu$$ is [linear attenuation coefficient](https://radiopaedia.org/articles/linear-attenuation-coefficient?lang=us).

{% marginnote 'table-1-id' "Here's a quick list of a few useful ones, sourced from [Wikipedia](https://en.wikipedia.org/wiki/Hounsfield_scale)." %}
<div class="table-wrapper">
<table class="booktabs">
<tbody><tr>
<th colspan="2">Substance</th>
<th>HU
</th></tr>
<tr>
<td colspan="2"><a href="/wiki/Air" class="mw-redirect" title="Air">Air</a>
</td>
<td>−1000
</td></tr>
<tr>
<td colspan="2"><a href="/wiki/Fat" title="Fat">Fat</a>
</td>
<td>−120 to −90
</td></tr>
<tr>
<td colspan="2">Soft tissue on <a href="/wiki/Contrast_CT" title="Contrast CT">contrast CT</a>
</td>
<td>+100 to +300
</td></tr>
<tr>
<td rowspan="2"><a href="/wiki/Bone" title="Bone">Bone</a></td>
<td>Cancellous</td>
<td>+300 to +400
</td></tr>
<tr>
<td>Cortical</td>
<td>+1800 to +1900
</td></tr>
</tbody></table>
</div>



## Windowing
Since it is difficult to recognize 4000 shades of gray easily, we use windowing. It limits the number of Hounsfield units that are displayed. 

For example, if we want to examine the soft tissue in one CT scan we can use a window level of 40 and a window Width of 80 this will cover 40 units below and above the window level and the tissues with CT numbers outside this range will appear either black or white. A narrow range provides a higher contrast.

The **window width** is the range of the grayscale that can be displayed. The center of grayscale range is referred to as the **window level**.

<figure>
<img src="/assets/img/dicom-intro/window.png" width=600>
<figcaption>Window width vs Window level</figcaption>
</figure>

You can go through [this blog](https://kevalnagda.github.io/ct-windowing) to learn more about windowing.

# Walkthrough Ohif Viewer

This section contains steps on how to use ohif viewer for viewing dicom file based medical records (studies, series, instances).

## Homepage
Here you see the studies you have uploaded. Each study have series and these series have instances / images.

<img src="/assets/img/dicom-intro/ohif-home.png">

Studies can be uploaded using `+` button on right. Example is shown below.

<img src="/assets/img/dicom-intro/ohif-home.gif">

## Details on Scan View

<img src="/assets/img/dicom-intro/ct-scan-view.png">

## Calibrating Windowing

<img src="/assets/img/dicom-intro/ohif-change-WL.gif">

Vertical mouse movement changes window level and horizontal movement changes window width.

## Visualization of slices


<img src="/assets/img/dicom-intro/ohif-slice.gif">


## 2D Multiplanar Reconstruction (MPR)

<img src="/assets/img/dicom-intro/ohif-2d-mpr.png">


The MPR tool provided within the Viewer can be used to reconstruct images in orthogonal planes (coronal, sagittal, axial or oblique, depending on what the base image plane is). This can help to create a visualization of the anatomy which was not possible using base images alone.

## Report view

<img src="/assets/img/dicom-intro/ohif-report.png">

Report view has report on doc/pdf format displayed in viewer.

# References

["Significance of digital imaging and communication in medicine in digital imaging". digitmedicine.com](https://www.digitmedicine.com/article.asp?issn=2226-8561;year=2015;volume=1;issue=2;spage=63;epage=66;aulast=Gupta)

["Picture archiving and communication system". medico-eng.com](http://www.medico-eng.com/en/products.php?id=71)

["The case for RIS/PACS integration". PUBMED NCBI](https://pubmed.ncbi.nlm.nih.gov/12080929/)

["Counting Studies, Series and Instances". medicalconnections.co.uk](https://www.medicalconnections.co.uk/kb/counting-studies-series-and-instances/)

> **Follow me on twitter [@theujjwal9](https://twitter.com/theujjwal9)**