# Makefile to start Titanium Mobile project from the command line.
# More info at http://github.com/guilhermechapiewski/titanium-jasmine

# Original script was ment to be run in the parent of project-dir Dealium
# all paths were ${PROJECT_ROOT}/${PROJECT_NAME}/Resources
# this is customized to Dealium, and paths are ${PROJECT_ROOT}/Resources
# makes sense since we need to customize testing namespace 'd.tests_enabled' anyway

PROJECT_NAME=Gamburg
PROJECT_ROOT=$(shell pwd)

run-iphone:
	@DEVICE_TYPE=iphone make run

test-iphone:
	@DEVICE_TYPE=iphone make test

install-android:
	@DEVICE_TYPE=android make install

run:
	@if [ "${DEVICE_TYPE}" == "" ]; then\
		echo "Please run \"make run-[iphone|android]\" instead.";\
		exit 1;\
	fi
	@mkdir -p ${PROJECT_ROOT}/Resources/test/
	@echo "" > ${PROJECT_ROOT}/Resources/test/enabled.js
	@BUILD_COMMAND=run make launch-titanium

test:
	@if [ "${DEVICE_TYPE}" == "" ]; then\
		echo "Please run \"make test-[iphone|android]\" instead.";\
		exit 1;\
	fi
	@mkdir -p ${PROJECT_ROOT}/Resources/test/
	@echo "d.tests_enabled = true;" > ${PROJECT_ROOT}/Resources/test/enabled.js
	@BUILD_COMMAND=install make launch-titanium

install:
	@if [ "${DEVICE_TYPE}" == "" ]; then\
		echo "Please run \"make run-[iphone|android]\" instead.";\
		exit 1;\
	fi
	@mkdir -p ${PROJECT_ROOT}/Resources/test/
	@echo "" > ${PROJECT_ROOT}/Resources/test/enabled.js
	@BUILD_COMMAND=install make launch-titanium

clean-iphone:
	@DEVICE_TYPE=iphone make clean

clean-android:
	@DEVICE_TYPE=android make clean
	
clean:
	@if [ "${DEVICE_TYPE}" == "" ]; then\
		echo "Please run \"make run-[iphone|ipad]\" instead.";\
		exit 1;\
	fi
	@rm -rf ${PROJECT_ROOT}/build/${DEVICE_TYPE}/*
	@mkdir -p ${PROJECT_ROOT}/build/${DEVICE_TYPE}/
	@echo "Deleted: ${PROJECT_ROOT}/build/${DEVICE_TYPE}/*"

launch-titanium:
	@echo "Building with Titanium... (DEVICE_TYPE:${DEVICE_TYPE})"
	@mkdir -p ${PROJECT_ROOT}/build/${DEVICE_TYPE}/
	@PROJECT_NAME=${PROJECT_NAME} PROJECT_ROOT=${PROJECT_ROOT} DEVICE_TYPE=${DEVICE_TYPE} BUILD_COMMAND=${BUILD_COMMAND} bash ${PROJECT_ROOT}/bin/titanium.sh

# targets to facilitate working with staging/master versions and githug
	
git-pull-all:
	@echo "Pulling all branches from GitHub"
	@git co working
	@git pull origin working
	@git co staging
	@git pull origin staging
	@git co master
	@git pull origin master
	
git-merge-push-all:
	@echo "Mergin working->staging->master and pushing all to GitHub"
	@git co working
	@git push origin working
	@git co staging
	@git merge working
	@git push origin staging
	@git co master
	@git merge staging
	@git push origin master	