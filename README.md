Configuración del sistema para pruebas en local
==============================================
Para realizar las pruebas sin desplegar en ningún servidor externo, será necesario instalar un apache en la máquina local.
Los enlaces de descarga se pueden encontrar en la siguiente URL:

[Página principal de Apache](http://httpd.apache.org/)

Una vez descargado e instalado, deberemos activar los siguientes módulos en nuestro fichero __httpd.conf__ descomentando las lineas (Eliminando la __#__):

    LoadModule proxy_module modules/mod_proxy.so
    LoadModule proxy_http_module modules/mod_proxy_http.so

Despues nos desplazaremos al final de nuestro fichero __httpd.conf__ y agregaremos un virtualhost con la siguiente configuración:


    <VirtualHost *:80>
        ServerName jswars.io

        DocumentRoot "[RUTA A NUESTRO PROYECTO DE CLIENTE HTML]"
        <Directory "[RUTA A NUESTRO PROYECTO DE CLIENTE HTML]">
            Order allow,deny
            Allow from all
            AllowOverride All
        </Directory>


         ProxyRequests on
         <Proxy *>
             Order deny,allow
             Allow from all
         </Proxy>

         ProxyPass /services/ http://localhost:8090/
         ProxyPassReverse /services/ http://localhost:8090/

         <Location />
             Order allow,deny
             allow from all
         </Location>
    </VirtualHost>

Téngase en cuenta que __[RUTA A NUESTRO PROYECTO DE CLIENTE HTML]__ debe ser sustituido por la ruta en la que se encuentre nuestro proyecto.

La función de este virtualhost es de servir nuestro código local de la aplicación en tiempo real, redirigiendo a su vez
todo el tráfico dirigido al servidor de la plataforma, siempre a partir de la ruta /services/

Para que el virtualhost se funcional, debemmos abrir nuestro fichero __host__ (Que según si el sistema es Windows, Linux
o Mac variará su ubicación) y agregar la siguiente línea:

    127.0.0.1 dev.tfg.com

Esto resolverá todo el tráfico a ese nombre de dominio a nuestrá máquina local y será procesado por nuestro virtualhost.

NPM INSTALL
===========
Para realizar un install en windows 8.1 se requieres Microsoft Visual Studio 2013 Expresss. En caso contrario fallará

[Microsoft Visual Studio 2013 Expresss Download](http://go.microsoft.com/?linkid=9832280&clcid=0x409)

