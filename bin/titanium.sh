#!/bin/bash

# Utility script to start Titanium Mobile project from the command line.
# More info at http://github.com/guilhermechapiewski/titanium-jasmine

PROJECT_NAME=${PROJECT_NAME}
PROJECT_ROOT=${PROJECT_ROOT:-../}
BUILD_COMMAND=${BUILD_COMMAND}
APP_DEVICE=${DEVICE_TYPE}
IPHONE_SDK_VERSION="4.2"
ANDROID_SDK_DIR="/Users/mepihlaj/projects/android/android-sdk-mac_x86"
TI_SDK_VERSION="1.6.1"
TI_DIR="/Library/Application\ Support/Titanium"
TI_ASSETS_DIR="${TI_DIR}/mobilesdk/osx/${TI_SDK_VERSION}"
TI_IPHONE_DIR="${TI_ASSETS_DIR}/iphone"
TI_ANDROID_DIR="${TI_ASSETS_DIR}/android"
TI_IPHONE_BUILD="${TI_IPHONE_DIR}/builder.py"
TI_ANDROID_BUILD="${TI_ANDROID_DIR}/builder.py"

# this is Google APIs 2.2, id:s can be listed with titanium mobile_sdk's avd.py command
ANDROID_SDK_ID="6"

if [ "PROJECT_NAME" == "" ]; then
	echo "[ERROR] Please inform PROJECT_NAME."
	exit 1
fi

if [ "DEVICE_TYPE" == "" ]; then
	echo "[ERROR] Please inform DEVICE_TYPE ('ipad', 'iphone' or 'android')."
	exit 1
fi

# Get APP parameters from current tiapp.xml
APP_ID=`cat tiapp.xml | grep "<id>" | sed -e "s/<\/*id>//g"`
APP_NAME=`cat tiapp.xml | grep "<name>" | sed -e "s/<\/*name>//g"`

if [ "APP_ID" == "" ] || [ "APP_NAME" == "" ]; then
	echo "[ERROR] Could not obtain APP parameters from tiapp.xml file (does the file exist?)."
	exit 1
fi

if [ ${APP_DEVICE} == "iphone" ]; then
  bash -c "${TI_IPHONE_BUILD} ${BUILD_COMMAND} ${PROJECT_ROOT}/ ${IPHONE_SDK_VERSION} ${APP_ID} ${APP_NAME} ${APP_DEVICE}" \
	  | perl -pe 's/^\[DEBUG\].*$/\e[35m$&\e[0m/g;s/^\[INFO\].*$/\e[36m$&\e[0m/g;s/^\[WARN\].*$/\e[33m$&\e[0m/g;s/^\[ERROR\].*$/\e[31m$&\e[0m/g;'

  killall "iPhone Simulator"
fi

if [ ${APP_DEVICE} == "android" ]; then
  echo ${BUILD_COMMAND}
bash -c "${TI_ANDROID_BUILD} ${BUILD_COMMAND} ${PROJECT_NAME} ${ANDROID_SDK_DIR} ${PROJECT_ROOT}/ ${APP_ID} ${ANDROID_SDK_ID}" \
	| perl -pe 's/^\[DEBUG\].*$/\e[35m$&\e[0m/g;s/^\[INFO\].*$/\e[36m$&\e[0m/g;s/^\[WARN\].*$/\e[33m$&\e[0m/g;s/^\[ERROR\].*$/\e[31m$&\e[0m/g;'
fi
