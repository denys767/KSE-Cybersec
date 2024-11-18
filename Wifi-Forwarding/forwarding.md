# Перенаправлення порту 1234 з інтерфейсу `wlan1` на `br-wan`

Цей посібник пояснює, як перенаправити трафік на порту `1234` з зовнішнього інтерфейсу `wlan1` на інтерфейс `br-wan`, де працює веб-сервер на порту `80`, використовуючи `iptables`.

## Інструкція

```bash
# 1. Увімкнення пересилання IP
cat /proc/sys/net/ipv4/ip_forward
sudo sysctl -w net.ipv4.ip_forward=1
sudo sh -c 'echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf'
sudo sysctl -p

# 2. Додавання правил перенаправлення порту
sudo iptables -t nat -A PREROUTING -i wlan1 -p tcp --dport 1234 -j DNAT --to-destination 172.16.1.102:80

# 3. Додавання правил для дозволу пересланого трафіку
sudo iptables -A FORWARD -i wlan1 -o br-wan -p tcp -d 172.16.1.102 --dport 80 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A FORWARD -i br-wan -o wlan1 -p tcp -s 172.16.1.102 --sport 80 -m state --state ESTABLISHED,RELATED -j ACCEPT

# 4. Додавання правил до ланцюжка INPUT
sudo iptables -A INPUT -i wlan1 -p tcp --dport 1234 -j ACCEPT
sudo iptables -A INPUT -i br-wan -p tcp --dport 80 -j ACCEPT

# 5. Перевірка налаштувань
sudo iptables -t nat -L -v
sudo iptables -L -v
sudo iptables -L -n

# 6. Збереження конфігурації
sudo iptables-save > /etc/iptables/rules.v4
sudo iptables-restore < /etc/iptables/rules.v4

# Якщо використовується iptables-persistent
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
