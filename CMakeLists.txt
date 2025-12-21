cmake_minimum_required(VERSION 3.28.3)

add_subdirectory(crow)

project(portfolio)

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} PUBLIC Crow)