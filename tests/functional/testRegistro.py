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



timeout = 5
f = open("logTestRegistro.txt", mode="wt")

try:
    time.sleep(timeout)
    modal = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/button").click()
except:
    print("LOG Test Registro - No fue posible pulsar el boton de Login")
    f.write(f"LOG Test Registro - No fue posible pulsar el boton de Login \n")

print("LOG Test Registro - Boton de Login pulsado con exito")
f.write(f"LOG Test Registro - Boton de Login pulsado con exito")
try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/ngb-modal-window/div/div/app-login/div'))
    WebDriverWait(driver, timeout).until(element_present)
except TimeoutException:
    print(f"LOG Test Registro - No fue posible cargar el modal de Login")
    f.write(f"LOG Test Registro - No fue posible cargar el modal de Login \n")

print("LOG Test Registro - Modal de Login cargado con exito")
f.write(f"LOG Test Registro - Modal de Login cargado con exito")

try:
    registro = driver.find_element(By.LINK_TEXT, "Sign Up!").click()
    print("LOG Test Registro - Modal de Registro cargado con exito")
    f.write(f"LOG Test Registro - Modal de Registro cargado con exito \n")
except:
    print("LOG Test Registro - No ha sido posible cargar el Modal de Registro")
    f.write(f"LOG Test Registro - No ha sido posible cargar el Modal de Registro \n")

try:

    time.sleep(timeout)
    username = drive.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-register/form/div[1]/input").send_keys(username)
    email = drive.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-register/form/div[2]/input").send_keys(email)
    password1 = drive.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-register/form/div[3]/input").send_keys(password)
    password2 = drive.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-register/form/div[4]/input").send_keys(password)
    botonRegistro = drive.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-register/form/button").click()
    print("LOG Test Registro - Usuario registrado con exito")
    f.write(f"LOG Test Registro - Usuario registrado con exito \n")
except:
    with open('./GitHub_Action_Results.txt', 'w') as f:
        print("LOG Test Registro - No fue posible registrar el usuario")
        f.write(f"LOG Test Registro - No fue posible registrar el usuario \n")
f.close()




