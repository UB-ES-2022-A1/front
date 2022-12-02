from selenium import webdriver
import time
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.FirefoxOptions()
options.headless = True
driver = webdriver.Firefox(options=options)

username = "mrtest"
email = "fabianserranolpz@gmail.com"
password = "193491482205390"

driver.get("https://atyourservice-test.onrender.com/")

timeout = 10
f = open("logTestBusqueda.txt", mode="wt")

try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/app-root/div/app-header/header/div[1]/div/input'))
    WebDriverWait(driver, timeout).until(element_present)
    busqueda = driver.find_element(By.XPATH, '/html/body/app-root/div/app-header/header/div[1]/div/input')
    print(f"LOG Test Busqueda - Se muestran la barra de busqueda correctamente")
    f.write(f"LOG Test Busqueda - Se muestra la barra de busqueda correctamente \n")
except:
    print(f"LOG Test Busqueda - No se muestra la barra de busqueda correctamente ")
    f.write(f"LOG Test Busqueda - No se muestra la barra de busqueda correctamente \n")