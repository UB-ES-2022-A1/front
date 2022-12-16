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
    print("LOG Test Pedir Servicios - No fue posible pulsar el boton de Login")
    f.write(f"LOG Test Pedir Servicios - No fue posible pulsar el boton de Login \n")
print("LOG Test Pedir Servicios - Boton de Login pulsado con exito")
f.write(f"LOG Test Pedir Servicios - Boton de Login pulsado con exito \n")
try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/ngb-modal-window/div/div/app-login/div'))
    WebDriverWait(driver, timeout).until(element_present)
except:
    print(f"LOG Test Pedir Servicios - No fue posible cargar el modal de Login")
    f.write(f"LOG Test Pedir Servicios - No fue posible cargar el modal de Login \n")

print((f"LOG Test Pedir Servicios - Modal de Login pulsado con exito"))
f.write(f"LOG Test Pedir Servicios - Modal de Login pulsado con exito \n")
try:
    email = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[1]/input").send_keys(autentificacionEmail)
    password = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[2]/input").send_keys(autentificacionPassword)

    botonLogin = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/button").click()
    time.sleep(5)
except:

    print(f"LOG Test Pedir Servicios - No ha sido posible introducir los datos de Login")
    f.write(f"LOG Test Pedir Servicios - No ha sido posible introducir los datos de Login \n")

try:
    texto = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[3]/em")

    print(f"LOG Test Pedis Servicios - Funciona conexión a backend login, pero datos de login incorrectos")
    f.write(f"LOG Test Pedir Servicios - Funciona conexión a backend login, pero datos de login incorrectos \n")
except:
    time.sleep(10)
    texto = driver.find_element(By.XPATH, "/html/body/app-root/div/app-header/header/div[2]/div/h5[1]")

    print(f"LOG Test Pedir Servicios - Test Completado con Exito, Usuario Loggeado")
    f.write(f"LOG Test Pedir Servicios - Test Completado con Exito, Usuario Loggeado \n")

try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/app-root/div/app-main/div/div[2]/app-card-anuncio[1]/div/img'))
    WebDriverWait(driver, timeout).until(element_present)
    print(f"LOG Test Servicios - Se muestran los servicios correctamente, conexion correcta con backend")
    f.write(f"LOG Test Servicios - Se muestran los servicios correctamente, conexion correcta con backend \n")
except:
    print(f"LOG Test Servicios - No fue posible conectar con la base de datos de servicios")
    f.write(f"LOG Test Servicios - No fue posible conectar con la base de datos de servicios \n")

try:
    element_present = driver.find_element((By.XPATH, '/html/body/app-root/div/app-main/div/div[2]/app-card-anuncio[1]/div/img')).click()
    print(f"LOG Test Servicios - Se muestran los servicios correctamente, conexion correcta con backend")
    f.write(f"LOG Test Servicios - Se muestran los servicios correctamente, conexion correcta con backend \n")
except:
    print(f"LOG Test Servicios - No fue posible conectar con la base de datos de servicios")
    f.write(f"LOG Test Servicios - No fue posible conectar con la base de datos de servicios \n")

try:
    time.sleep(10)
    element = driver.find_element((By.XPATH, '/html/body/app-root/div/app-service-detail/div/div[2]/div[2]/textarea')).send_keys('Buenas, quiero contratar este servicio')
    print(f"LOG Test Servicios - Escrito mensaje para el vendedor de forma correcta")
    f.write(f"LOG Test Servicios - Escrito mensaje para el vendedor de forma correcta \n")
except:
    print(f"LOG Test Servicios - No fue posible escribir un mensaje al vendedor")
    f.write(f"LOG Test Servicios - No fue posible escribir un mensaje al vendedor")

try:
    time.sleep(10)
    element = driver.find_element((By.XPATH, '/html/body/app-root/div/app-service-detail/div/div[2]/div[2]/div/button')).click()
    print(f"LOG Test Servicios - Mensaje enviado al vendedor de forma correcta")
    f.write(f"LOG Test Servicios - Mensaje enviado al vendedor de forma correcta \n")
except:
    print(f"LOG Test Servicios - No fue posible enviar el mensaje al vendedor")
    f.write(f"LOG Test Servicios - No fue posible enviar el mensaje al vendedor")

f.close()