from selenium import webdriver
import time
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.FirefoxOptions()
options.headless = True
driver = webdriver.Firefox()

username = "mrtest"
email = "fabianserranolpz@gmail.com"
password = "193491482205390"

driver.get("https://atyourservice-test.onrender.com/")

timeout = 10
f = open("logTestServicios.txt", mode="wt")

try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/app-root/div/app-main/div/div[2]/app-card-anuncio[1]/div/img'))
    WebDriverWait(driver, timeout).until(element_present)
    print(f"LOG Test Servicios - Se muestran los servicios correctamente, conexion correcta con backend")
    f.write(f"LOG Test Servicios - Se muestran los servicios correctamente, conexion correcta con backend \n")
except:
    print(f"LOG Test Servicios - No fue posible conectar con la base de datos de servicios")
    f.write(f"LOG Test Servicios - No fue posible conectar con la base de datos de servicios \n")