## prj_portagents
### Python y Ract native

### Pasos:

#### Frontend React:
- npm install -g expo-cli
- dentro de la carpeta **fronted_react**
    - expo init <nombre proyecto>
    - una vez instalado (con expo init) lanzo la app con: **expo start o npm start**
        - abre la url: [http://localhost:19002/](http://localhost:19002/)
- expo install expo-sqlite
- [instalar react-navigation](https://reactnavigation.org/docs/getting-started#installation)
    - npm install @react-navigation/native
    - [para expo](https://reactnavigation.org/docs/getting-started#installing-dependencies-into-an-expo-managed-project)
    ```
    expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
    ```
- [npm install @react-navigation/stack](https://reactnavigation.org/docs/hello-react-navigation)
- `npm i react-native-uuid`
- `npm i expo-file-system`
- [`npm i react-native-elements`](https://reactnativeelements.com/docs/overview)

#### Analisis:
- Servidor AWS
    - Instancia EC2
    - tendrá 3 entornos, 3 dominios https (preferiblemente o al menos 2)
        - dev.<dominio.xyz>
        - test.<dominio.xyz>
        - <dominio.xyz>
    - tendra 3 bd (preferiblemente o al menos 2)
        - dev
        - test
        - prod
- App móvil que trabajará de modo offline:
    - Se ajustará a un tamaño concreto de terminal
    - El diseño de la interfaz de usuario será neutro
    - La bd local (sqlite) guardará los usuarios iniciales y sus accesos
    - El usuario hará login en el terminal según estos datos
    - La pantalla inicial será un listado con todos los voucher sin coumunicar, en caso de estár vacio se asume que se han enviado al servidor.
    - La opción de sincronización será manual de modo que se pueda enviar los datos al servidor cuando se asegure de tener suficiente cobertura.
    - Habrá un proceso de captura de firma.  La firma se dibujara sobre un elemento canvas que posteriormente se transformará en un string que se guardará en la bd
    - Habrá un botón para salir (logout) de la app, en ese momento se eliminarán los voucher enviados ok
- App servidor:
    - **bd en mysql**
        - será una bd espejo de lo que hay en (sqlite) el terminal
    - **api**
        - se encargará de la gestión de las comunicaciones
            - volcará los datos en mysql y enviará un ok en caso correcto o un nok en caso que el hash no coincida
        - hará la presistencia
        - tendra una interfaz para la generación de pdfs con firma (**1**)
        - habrá una interfaz para el envío por mail de ficheros generados (**2**)
    - **cron**
        - es la rutina que comprobará cada 3 minutos si hay nuevos voucher nuevo en la bd (mysql)
        - si es así, generará un pdf con la información (llamará a la interfaz **1**) y despues llamará al ainterfaz (**2**)

- **Las comunicaciones**: 
    - El terminal recopila un bloque de registros voucher con sus imágenes
    - Genera un hash con cada registro (incluye el encode de la imágen)
    - hace un post del hash y el payload
    - si el payload no ha llegado completo o corrupto sera comprobado por medio del hash. Si no es válido se enviará un nok con un motivo al terminal
    - en caso de nok el terminal continuará con el siguiente marcando este voucher como no comunicado.
        - que sucede si el serv envia un nok y el terminal pierde la cobertura?
    - en caso de ok el terminal marcara como enviado el voucher
        - que sucede si el serv envia un ok y el terminal pierde la conexión?
    - La api, si en el servidor ha marcado un ok y el terminal no lo ha registrado la próxima vez deberá obviar el voucher
    - En caso de nok, la api no habrá registrado el voucher en el servidor con lo cual habrá los seguientes reintentos se gestionarán como nuevos  

