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
tlf = "999999999"

driver.get("https://atyourservice-test.onrender.com/")



timeout = 10
f = open("logTestEdicionPerfil.txt", mode="wt")
try:
    time.sleep(timeout)
    modal = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/button").click()
except:
    print("LOG Test Edicion Perfil - No fue posible pulsar el boton de Login")
    f.write(f"LOG Test Edicion Perfil - No fue posible pulsar el boton de Login \n")
print("LOG Test Edicion Perfil - Boton de Login pulsado con exito")
f.write(f"LOG Test Edicion Perfil - Boton de Login pulsado con exito \n")
try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/ngb-modal-window/div/div/app-login/div'))
    WebDriverWait(driver, timeout).until(element_present)
except:
    print(f"LOG Test Edicion Perfil - No fue posible cargar el modal de Login")
    f.write(f"LOG Test Edicion Perfil - No fue posible cargar el modal de Login \n")

print((f"LOG Test Edicion Perfil - Modal de Login pulsado con exito"))
f.write(f"LOG Test Edicion Perfil - Modal de Login pulsado con exito \n")
try:
    email = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[1]/input").send_keys(autentificacionEmail)
    password = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[2]/input").send_keys(autentificacionPassword)

    botonLogin = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/button").click()
except:

    print(f"LOG Test Edicion Perfil - No ha sido posible introducir los datos de Login")
    f.write(f"LOG Test Edicion Perfil - No ha sido posible introducir los datos de Login \n")

try:
    texto = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[3]/em")

    print(f"LOG Test Edicion Perfil - Funciona conexión a backend login, pero datos de login incorrectos")
    f.write(f"LOG Test Edicion Perfil - Funciona conexión a backend login, pero datos de login incorrectos \n")
except:
    time.sleep(10)
    texto = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/div/h5[1]")

    print(f"LOG Test Edicion Perfil -  Usuario Loggeado")
    f.write(f"LOG Test Edicion Perfil - Usuario Loggeado \n")

try:
    enlace = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/div/h5[1]").click()
    print(f"LOG Test Edicion Perfil - Se ha podido acceder al Perfil del usuario correctamente")
    f.write(f"LOG Test Edicion Perfil - Se ha podido acceder al Perfil del usuario correctamente \n")
except:
    print(f"LOG Test Edicion Perfil - No ha sido posible acceder al perfil del usuario")
    f.write(f"LOG Test Edicion Perfil - No ha sido posible acceder al perfil del usuario \n")

try:
    time.sleep(10)
    boton = driver.find_element(By.XPATH, "/html/body/app-root/div/app-profile/div/div/div[2]/div/div[6]/button").click()
    print(f"LOG Test Edicion Perfil - Se ha pulsado el boton de edicion correctamente")
    f.write(f"LOG Test Edicion Perfil - Se ha pulsado el boton de edicion correctamente \n")
except:
    print(f"LOG Test Edicion Perfil - El boton de edicion no se ha podido pulsar")
    f.write(f"LOG Test Edicion Perfil - El boton de edicion no se ha podido pulsar \n")

try:
    time.sleep(10)
    campo = driver.find_element(By.XPATH, "/html/body/app-root/div/app-profile/div/div/div[2]/div/div[4]/div/input").send_keys(tlf)
    print(f"LOG Test Edicion Perfil - El campo de edicion de numero de telefono se ha modificado correctamente")
    f.write(f"LOG Test Edicion Perfil - El campo de edicion de numero de telefono se ha modificado correctamente \n")
except:
    print(f"LOG Test Edicion Perfil - No se ha podido introducir un numero de telefono nuevo")
    f.write(f"LOG Test Edicion Perfil - No se ha podido introducir un numero de telefono nuevo \n")

try:
    time.sleep(10)
    guardar = driver.find_element(By.XPATH, "/html/body/app-root/div/app-profile/div/div/div[2]/div/div[6]/div/button[2]").click()
    print(f"LOG Test Edicion Perfil - Boton de guardar pulsado con exito, Test completado correctamente")
    f.write(f"LOG Test Edicion Perfil - Boton de guardar pulsado con exito, Test completado correctamente \n")
except:
    print(f"LOG Test Edicion Perfil - No se pudo pulsar el boton de guardado")
    f.write(f"LOG Test Edicion Perfil - No se pudo pulsar el boton de guardado \n")


f.close()