@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set ERROR_CODE=0

set MAVEN_BATCH_PAUSE=
if not "%MAVEN_BATCH_PAUSE%"=="" set PAUSE_CMD=pause
set MAVEN_TERMINATE_CMD=
if not "%MAVEN_TERMINATE_CMD%"=="" set EXIT_CMD=exit

set SCRIPT_DIR=%~dp0
set WRAPPER_JAR="%SCRIPT_DIR%\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%SCRIPT_DIR%\.mvn\wrapper\maven-wrapper.properties"
set MAVEN_PROJECTBASEDIR=%SCRIPT_DIR%

set DOWNLOAD_URL=
for /F "usebackq tokens=1,2 delims==" %%A in (%WRAPPER_PROPERTIES%) do (
  if "%%A"=="distributionUrl" set DOWNLOAD_URL=%%B
)

if exist %WRAPPER_JAR% goto run

echo Downloading Maven Wrapper jar
powershell -NoLogo -NoProfile -Command "$line = (Select-String -Path '%WRAPPER_PROPERTIES%' -Pattern '^wrapperUrl=' -ErrorAction Stop | Select-Object -First 1).Line; $u = $line.Substring($line.IndexOf('=') + 1); [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -UseBasicParsing -Uri $u -OutFile %WRAPPER_JAR%"
if not %ERRORLEVEL%==0 goto error

:run
set JAVA_EXE=java.exe
"%JAVA_EXE%" -classpath %WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
if not "%MAVEN_BATCH_PAUSE%"=="" pause
if not "%MAVEN_TERMINATE_CMD%"=="" %EXIT_CMD% %ERROR_CODE%
endlocal & exit /B %ERROR_CODE%

@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set ERROR_CODE=0

set MAVEN_BATCH_PAUSE=
if not "%MAVEN_BATCH_PAUSE%"=="" set PAUSE_CMD=pause
set MAVEN_TERMINATE_CMD=
if not "%MAVEN_TERMINATE_CMD%"=="" set EXIT_CMD=exit

set SCRIPT_DIR=%~dp0
set WRAPPER_JAR="%SCRIPT_DIR%\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%SCRIPT_DIR%\.mvn\wrapper\maven-wrapper.properties"
set MAVEN_PROJECTBASEDIR=%SCRIPT_DIR%

set DOWNLOAD_URL=
for /F "usebackq tokens=1,2 delims==" %%A in (%WRAPPER_PROPERTIES%) do (
  if "%%A"=="distributionUrl" set DOWNLOAD_URL=%%B
)

if exist %WRAPPER_JAR% goto run

echo Downloading Maven distribution %DOWNLOAD_URL%
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri %DOWNLOAD_URL% -OutFile '%SCRIPT_DIR%\apache-maven.zip'"
if not %ERRORLEVEL%==0 goto error

tar -xf "%SCRIPT_DIR%\apache-maven.zip" -C "%SCRIPT_DIR%\.." >NUL 2>&1
if not %ERRORLEVEL%==0 goto error

mkdir "%SCRIPT_DIR%\wrapper" >NUL 2>&1
copy /Y "%SCRIPT_DIR%\..\apache-maven-3.9.8\lib\maven-embedder-*.jar" %WRAPPER_JAR% >NUL 2>&1

:run
set JAVA_EXE=java.exe
"%JAVA_EXE%" -classpath %WRAPPER_JAR% org.apache.maven.wrapper.MavenWrapperMain %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
if not "%MAVEN_BATCH_PAUSE%"=="" pause
if not "%MAVEN_TERMINATE_CMD%"=="" %EXIT_CMD% %ERROR_CODE%
endlocal & exit /B %ERROR_CODE%


