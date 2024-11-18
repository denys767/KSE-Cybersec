# Обмеження доступу до машини лише для дозволених IP

Цей посібник пояснює, як налаштувати доступ до машини лише для кількох IP-адрес, заборонивши доступ для всіх інших, використовуючи `iptables`.

---

## Інструкція

```bash
# 1. Визначте IP-адреси, які мають доступ
# Замініть 192.168.1.100 і 192.168.1.101 на реальні дозволені IP-адреси.
ALLOWED_IPS=("192.168.1.100" "192.168.1.101")

# 2. Політика за замовчуванням: заборона вхідного трафіку
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP

# 3. Дозвіл трафіку від дозволених IP-адрес
for ip in "${ALLOWED_IPS[@]}"; do
  sudo iptables -A INPUT -s "$ip" -j ACCEPT
done

# 4. Дозвіл трафіку з локальної машини (loopback)
sudo iptables -A INPUT -i lo -j ACCEPT

# 5. Дозвіл з'єднань, що були ініційовані вашою машиною
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 6. Перевірка налаштувань
sudo iptables -L -v

# 7. Збереження конфігурації
sudo iptables-save > /etc/iptables/rules.v4
sudo iptables-restore < /etc/iptables/rules.v4

# Якщо використовується iptables-persistent
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
