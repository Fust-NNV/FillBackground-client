import cv2
import numpy as np

# Load the image
image = cv2.imread("segment picture.jpg")
image1 = cv2.imread("image.png")
# Convert the image to HSV color space

# Create a mask for each color
mask = np.zeros((image.shape[0], image.shape[1]), dtype="uint8")
mask1 = np.zeros((image1.shape[0], image1.shape[1]), dtype="uint8")
for y in range(0,image.shape[0]):
    for x in range(0,image.shape[1]):
        if image[y,x][0] == 255:
            mask[y, x] = 3
        if image[y,x][0] == 37:
            mask[y, x] = 5
        if image[y,x][0] == 113:
            mask[y, x] = 7
        if image[y,x][0] == 0:
            mask[y, x] = 2
        else:
            mask[y, x] = 3
for y in range(0,image1.shape[0]):
    for x in range(0,image1.shape[1]):
        if image1[y,x][0] == 0:
            mask1[y, x] = 1
        if image1[y,x][0] == 255:
            mask1[y, x] = 11
        else:
            mask1[y, x] = 1
mask_full = np.multiply(mask, mask1)
with open("mask.txt", "w") as f:
    # For each row in the array
    for row in mask_full:
        # Write the row to the text file
        f.write(" ".join([str(x) for x in row]) + "\n")