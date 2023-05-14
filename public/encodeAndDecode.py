import cv2
import numpy as np
import os
from functools import reduce
from numpy import random
import matplotlib.pyplot as plt

#hàm factor, không cần sửa
def factor(n):
    factors = []
    i = 2
    while i * i <= n:
        if n % i:
            i += 1
        else:
            n //= i
            factors.append(i)
    if n > 1:
        factors.append(n)
    return factors

#hàm check prime, không cần sửa
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

#init các variable
prime_list = []
count = 0
n = 2

#path của folder, CÁI NÀY CẦN TỰ SỬA CHO GIỐNG TRONG COMPUTER
folder_path = "all_mask"
image_list = []
raw_image_list = []  

#Đưa mask thành 2 list với 1 list là raw mask, list 2 là mask 0,1
for filename in os.listdir(folder_path):
    if filename.endswith(".jpg") or filename.endswith(".png"): 
        image_path = os.path.join(folder_path, filename)
        raw_image = cv2.imread(image_path)
        image = cv2.imread(image_path, 0)
        binary_img = np.where(image > 0.5, 1, 0)
        if image is not None:
            image_list.append(binary_img)
            raw_image_list.append(raw_image)
number_of_images = len(image_list)
# print(number_of_images)

#lập list các số nguyên tố dựa trên số mask có được
while count < number_of_images:
    if is_prime(n):
        prime_list.append(n)
        count += 1
    n += 1
#print(prime_list)
#print(len(prime_list))

#từ 2 list của 2 mask(mask này dưới dạng 0,1) thành 2 dictionary với key là các số nguyên tố
dictionary = dict(zip(prime_list, image_list))
Raw_image_dictionary = dict(zip(prime_list, raw_image_list))

#đưa mask dưới dạng 0,1 thành dạng 1, số nguyên tố
list_of_prime_mask = []
for key, value in dictionary.items():
    prime_mask_have_0 = value*key
    prime_mask = np.where(prime_mask_have_0 == 0, 1, prime_mask_have_0)
    list_of_prime_mask.append(prime_mask)
#print(list_of_prime_mask)
#đưa dictionary của mask thành mask tổng
combined_array = reduce(np.multiply, list_of_prime_mask)

#random x, y trong ảnh
x = random.randint(image_list[0].shape[0])
y = random.randint(image_list[0].shape[1])
#decode pixel x,y thành các số nguyên tố mà từ số nguyên tố trong dictionary ra được file mask
print(factor(combined_array[x, y]), x, y)