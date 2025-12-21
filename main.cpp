#include <crow.h>

int main() {
	crow::SimpleApp app;

	CROW_ROUTE(app, "/")([]() {
		auto html = crow::mustache::load_text("index.html");
		return html;
	});

	CROW_ROUTE(app, "/add/<int>/<int>")([](int a, int b) {
		return std::to_string(a + b);
	});

	app.port(18080).multithreaded().run();

	return 0;
}