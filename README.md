Для Mac OS 

# Домашнее задание 11

## Инструкция по сборке нод

Для Mac OS 

- Сборка ноды **ipfs**:
 1) Скачиваем дистрибутив ноды (актуальная версия по [ссылке](https://dist.ipfs.io/#go-ipfs))
 ```sh
 $ wget https://dist.ipfs.io/go-ipfs/v0.8.0/go-ipfs_v0.8.0_darwin-amd64.tar.gz 
 ```
 2) Разархивируем папку и выполним следующие команды
 ```sh
 $ tar -xvzf go-ipfs_v0.8.0_darwin-amd64.tar.gz
 $ cd go-ipfs
 $ bash install.sh
 ```
 3) Проинициализируем **ipfs** и запустим процесс
 ```sh
 $ ipfs init
 $ ipfs daemon
 ```
 4) Запоминаем адрес ipfs-ноды и заносим его в **node.js_application/config.json** (При запуске он будет отображаться напротив поля *API server listening on* в формате */ip4/<IP-адрес>/tcp/<Номер порта>*)

- Сборка ноды **ethereum**:
 1) Скачиваем дистрибутив
 ```sh
 $ brew tap ethereum/ethereum
 $ brew install ethereum
 ```
 2) В корне проекта создаем папку *data*
 ```sh
 $ mkdir data
 ```
 3) Создаем новый аккаунт и запоминаем его публичный адрес.
 ```sh
 $ geth account new -datadir data
 ```
 4) (Optional) Для тестирование можно создать несколько аккаунтов и их прописать их в **genesis.json** в разделе *alloc* для начисления баланса
 5) Выполнить следующую команду для запуска майнинг-ноды и разблокировку аккаунт
 ```sh
 $ geth --datadir data --http --mine --networkid 15 --miner.etherbase <Запомненный аккаунт> --miner.gasprice 0 --miner.threads 2 --unlock <Запомненный аккаунт> --allow-insecure-unlock
 ```
 6) Запоминаем адрес ethereum-ноды и заносим его в **node.js_application/config.json** (При запуске он будет отображаться напротив поля *INFO [date] HTTP server started endpoint=* в формате *<IP-адрес>:<Номер порта>*)
 7) После деплоя контракта ноду можно запускать так
 ```sh
 $ geth --datadir data --http --mine --networkid 15 --miner.etherbase <Любой созданный акканут> --miner.gasprice 0 --miner.threads 2
 ```

## Инструкция по деплою контракта 
 1) Добавляем свою локальную сеть в brownie, в качестве *host* указываем сохраненный адресс ethereum-ноды
 ```sh
 $   brownie networks add live <Название сети> host=<Адресс ноды. Например: http://127.0.0.1:8545> chainid=15
 ```
 2) После переходим в папку *mapping* и запускаем скрипт деплоя
 ```sh 
 $ cd mapping
 $ brownie run deploy.py --network <Название сети>
 ```
 3) Запоминаем адрес контракта и заносим его в **node.js_application/config.json**

## Запуск node.js приложения
 1) Переходим в папку **node.js_application** и скачиваем необходимые зависимости
 ```sh
 $ cd node.js_application
 $ npm install
 ```
 2) Запускаем приложение и переходим по ссылке в браузере *127.0.0.1:8081*
 ```sh
 $ node index.js
 ```
 3) В файле **screencast.mp4** приведена демонстрация запуска нод и работы приложения


