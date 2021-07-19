FROM adoptopenjdk:11-hotspot AS builder
COPY . /src
WORKDIR /src
RUN curl https://deb.nodesource.com/setup_12.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y nodejs yarn
RUN ./gradlew build

FROM wisvch/spring-boot-base:2.1
COPY --from=builder /src/Backend/build/libs/member-registration.jar /srv/member-registration.jar
CMD ["/srv/member-registration.jar"]
