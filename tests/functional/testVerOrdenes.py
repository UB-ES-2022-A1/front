from selenium import webdriver
import time
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.FirefoxOptions()
options.headless = True
driver = webdriver.Firefox(options=options)

autentificacionEmail = "fabianserranolpz@gmail.com"
autentificacionPassword = "193491482205390"

driver.get("https://atyourservice-test.onrender.com/")



timeout = 10
f = open("logTestLogin.txt", mode="wt")
try:
    time.sleep(timeout)
    modal = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/button").click()
except:
    print("LOG Test Login - No fue posible pulsar el boton de Login")
    f.write(f"LOG Test Login - No fue posible pulsar el boton de Login \n")
print("LOG Test Login - Boton de Login pulsado con exito")
f.write(f"LOG Test Login - Boton de Login pulsado con exito \n")
try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/ngb-modal-window/div/div/app-login/div'))
    WebDriverWait(driver, timeout).until(element_present)
except:
    print(f"LOG Test Login - No fue posible cargar el modal de Login")
    f.write(f"LOG Test Login - No fue posible cargar el modal de Login \n")

print((f"LOG Test Login - Modal de Login pulsado con exito"))
f.write(f"LOG Test Login - Modal de Login pulsado con exito \n")
try:
    email = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[1]/input").send_keys(autentificacionEmail)
    password = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[2]/input").send_keys(autentificacionPassword)

    botonLogin = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/button").click()
    time.sleep(5)
except:

    print(f"LOG Test Login - No ha sido posible introducir los datos de Login")
    f.write(f"LOG Test Login - No ha sido posible introducir los datos de Login \n")

try:
    texto = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[3]/em")

    print(f"LOG Test Login - Funciona conexión a backend login, pero datos de login incorrectos")
    f.write(f"LOG Test Login - Funciona conexión a backend login, pero datos de login incorrectos \n")
except:
    time.sleep(10)
    texto = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/div/h5[1]")

    print(f"LOG Test Login - Test Completado con Exito, Usuario Loggeado")
    f.write(f"LOG Test Login - Test Completado con Exito, Usuario Loggeado \n")
f.close()