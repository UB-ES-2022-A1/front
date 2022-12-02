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
    print("LOG Test Forgot Password - No fue posible pulsar el boton de Login")
    f.write(f"LOG Test Forgot Password - No fue posible pulsar el boton de Login \n")
print("LOG Test Forgot Password - Boton de Login pulsado con exito")
f.write(f"LOG Test Forgot Password - Boton de Login pulsado con exito \n")
try:
    element_present = EC.presence_of_element_located((By.XPATH, '/html/body/ngb-modal-window/div/div/app-login/div'))
    WebDriverWait(driver, timeout).until(element_present)
except:
    print(f"LOG Test Forgot Password - No fue posible cargar el modal de Login")
    f.write(f"LOG Test Forgot Password - No fue posible cargar el modal de Login \n")

print((f"LOG Test Forgot Password - Modal de Login pulsado con exito"))
f.write(f"LOG Test Forgot Password - Modal de Login pulsado con exito \n")

try:
    time.sleep(timeout)
    forgotPassword = driver.find_element(By.XPATH, "/html/body/ngb-modal-window/div/div/app-login/div/div[3]/a").click()
    print(f"LOG Test Forgot Password - Boton de Forgot Password pulsado con exito")
    f.write(f"LOG Test Forgot Password - Boton de Forgot Password pulsado con exito")
except:
    print(f"LOG Test Forgot Password - No fue posible pulsar el boton de Forgot Password \n")
    f.write(f"LOG Test Forgot Password - No fue posible pulsar el boton de Forgot Password \n")

try:
    time.sleep(5)
    emailField = driver.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-forgot-modal/div/div/input").send_keys(autentificacionEmail)
    print(f"LOG Test Forgot Password - Email escrito con exito \n")
    f.write(f"LOG Test Forgot Password - Email escrito con exito \n")
except:
    print(f"LOG Test Forgot Password - No fue posible escribir el email \n")
    f.write(f"LOG Test Forgot Password - No fue posible escribir el email \n")

try:
    time.sleep(5)
    buttonPass = driver.find_element(By.XPATH, "/html/body/ngb-modal-window[2]/div/div/app-forgot-modal/div/button").click()
    print(f"LOG Test Forgot Password - Boton pulsado, Test completado con exito \n")
    f.write(f"LOG Test Forgot Password - Boton pulsado, Test completado con exito \n")
except:
    print(f"LOG Test Forgot Password - No fue posible pulsar el boton \n")
    f.write(f"LOG Test Forgot Password - No fue posible pulsar el boton \n")
f.close()


