cmake_minimum_required(VERSION 3.28.3)

find_package(Crow)

project(portfolio)

target_link_libraries(portfolio PUBLIC Crow::Crow)

add_executable(${PROJECT_NAME} main.cpp)