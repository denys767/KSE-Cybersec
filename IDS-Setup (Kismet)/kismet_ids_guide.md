# Налаштування Kismet як Wireless IDS

Цей посібник описує, як налаштувати Kismet для виявлення вторгнень у WiFi-мережу. У демонстраційній версії буде використовуватися тестовий маршрутизатор замість реальної точки доступу.

---

## Встановлення та базова конфігурація Kismet

```bash
# 1. Встановіть Kismet
sudo apt update
sudo apt install kismet -y

# 2. Додайте користувача до групи для роботи з WiFi-адаптером (замість $USER вкажіть ваше ім’я користувача)
sudo usermod -aG kismet $USER

# 3. Встановіть підтримку WiFi-адаптера у режимі моніторингу
# Перевірте доступні інтерфейси
sudo iw dev
# Увімкніть режим моніторингу на потрібному інтерфейсі (наприклад, wlan1)
sudo ip link set wlan1 down
sudo iw wlan1 set monitor control
sudo ip link set wlan1 up
```

## Налаштування конфігурації Kismet

```bash
# 1. Відкрийте файл конфігурації Kismet
sudo nano /etc/kismet/kismet.conf

# 2. Внесіть наступні зміни:

# Дозвольте використання пристрою моніторингу
source=wlan1

# Вкажіть фільтр для вашого SSID (наприклад, MyWiFiNetwork):
filter_tracker=bssid_filter:xx:xx:xx:xx:xx:xx

# Увімкніть методи виявлення вторгнень:
# - Виявлення DoS-атак (наприклад, фальшивих точок доступу)
alert=BEACONRANGE,ANY
alert=DEAUTHFLOOD,ANY
alert=DISASSOCFLOOD,ANY

# - Виявлення підроблених клієнтів
alert=CLIENTSOURCE,ANY

# - Виявлення "evil twin" атак
alert=BSSTIMESTAMP,ANY

# Увімкніть логування всіх подій:
log_types=pcapng,netxml,netjson

# 3. Збережіть файл і вийдіть (Ctrl+O, Enter, Ctrl+X).

```

## Запуск Kismet

```bash
# 1. Запустіть Kismet як службу
sudo systemctl start kismet

# 2. Перевірте статус Kismet
sudo systemctl status kismet

# 3. Відкрийте веб-інтерфейс Kismet у браузері:
# URL: http://localhost:2501
# Увійдіть як локальний користувач.
```

## Виявлення та тестування
1. Тестовий сценарій:
    - Налаштуйте тестовий роутер зі SSID TestNetwork для перевірки.
    - Змініть MAC-адресу адаптера та спробуйте підключитися до мережі як "підроблений клієнт".

2. Перегляд подій у веб-інтерфейсі:
    - Відкрийте вкладку Devices для аналізу доступних точок доступу.
    - Відкрийте вкладку Alerts для перегляду попереджень про підозрілу активність.

3. Логування:
    - Логи Kismet зберігаються у директорії /var/log/kismet/.
    - Використовуйте їх для детального аналізу:
bash

```bash 
ls /var/log/kismet/
```

4. Моніторинг трафіку:
    - Переконайтеся, що адаптер успішно захоплює пакети:
```bash
tcpdump -i wlan1
```

## Оптимізація налаштувань для безпеки
- Використовуйте фільтри для конкретних BSSID або клієнтів: У конфігурації можна додати:

```bash
filter_tracker=bssid_filter:xx:xx:xx:xx:xx:xx 
```

- Виявлення нових пристроїв у мережі: Активуйте попередження:

```bash
alert=NEWAP
alert=NEWCLIENT
```

- Захистіть доступ до Kismet: Увімкніть автентифікацію у веб-інтерфейсі:

```bash
sudo nano /etc/kismet/kismet_httpd.conf
```

- Додайте:
```plaintext
http_username=admin
http_password=securepassword
```

- Завершення роботи
    - Після тестування поверніть адаптер у нормальний режим:

```bash
sudo ip link set wlan1 down
sudo iw wlan1 set type managed
sudo ip link set wlan1 up
```