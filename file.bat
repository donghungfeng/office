:folderhider
@echo off
title Folder and File Hider
echo 1.S
echo 2.H
set /p hj=
if %hj%==1 GOTO sh
if %hj%==2 GOTO hi
GOTO folderhider

:hi
set/p folderr=Please input the folder you want to hide: 
if "%folderr%"==%folderr% GOTO hider
:hider
attrib +r +h +s %folderr%
exit

:sh
set /p showern=Please input the folder you want to show: 
if "%showern%"==%showern% GOTO shower
:shower
attrib -r -h -s %showern%
