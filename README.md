
# NAB


## Installation and run
Requires [Node.js](https://nodejs.org/) v14+ and [Yarn](https://yarnpkg.com/) to run.
- install dependencies: **`yarn install`**
- test: **`yarn test`**
- start server:  **`yarn start`**  
  By default, the server will run local on port 3000. For the convenience of viewers. i use sqlite and have a built-in mechanism to migrate data for testing, so you don't need to do anything extra.  
  In this project I only expose graphql endpoint [`localhost:3000/graphql`](http://localhost:3000/graphql)  
  You can use the following query sample  
```graphql
query {
  getProducts(filterType: { size: "S", color: "green" }, pageSize: 5) {
    id
    name
    sku
    color
    size
  }
}
```

## Tech
#### VI

Thực tế với các yêu cầu như thế này tôi sẽ chọn một trong các framework sẵn có của nodejs để thực hiện. Tuy nhiên đây là một bài test do đó tôi sẽ bắt đầu với một empty project.
Bài test được hoàn thành trong một khoản thời gian ngắn(ít hơn 4h) vì vậy tôi chỉ focus vào một số design pattern/technologies/coding convention đặc thù.

- **`Monorepos`** -  Trong vài năm qua, Babel, Angular, React, Jest và nhiều dự án mã nguồn mở khác đã chuyển sang sử dụng monorepos. Monorepos có rất nhiều lợi ích khi kết hợp cùng microservice architecture. Ở đây tôi sử dụng **yarn workspaces**
- `Typescript` - typing for javascript
- `Object Manager/DI` - Rất quan trọng cho việc scale up sau này. Các service được configured/inject in to object một cách flexible
- **`EAV`** Thiết kế database structure theo mô hình EAV.  The main advantage of using EAV is its flexibility. Ví dụ đơn giản là một sản phẩm có thể có rất nhiều attributes. Trong quá trình vận hành, user có thể muốn tạo thêm rất nhiều attributes mới. Thông thường sẽ cần phải đổi schema bằng việc thêm vào các cột mới. Thực sự rất tệ với cách làm này. Với việc sử dụng EAV model chúng ta sẽ không phải design lại table schema.
- `Graphql` query language for API
- Một số khác như: oop/dto/repository/intercepter....

#### EN

Actually with requirements like this i would choose one of the available frameworks of nodejs to do it. However this is a test so i will start from scratch and not use the existing framework.
The test was completed in a short amount of time (less than 4 hours) so I just focused on some specific design patterns/technologies/coding conventions.

- **`Monorepos`** Over the past few years, Babel, Angular, React, Jest and many other open source projects have switched to using monorepos. Monorepos have many benefits when combined with microservice architecture. In this project, I use **yarn workspaces**
- `Typescript` - typing for javascript
- `Object Manager/DI` - Very important for later scaling up. Services are configured/injected in to object flexibly
- **`EAV`**Design database structure according to EAV model. The main advantage of using EAV is its flexibility. A simple example is that a product can have many attributes. During the operation, the user may want to create a lot of new attributes. Usually it will be necessary to change the schema by adding new columns. Really bad with this approach. But with the use of EAV model we don't require a schema redesign every time new attribute needs to be introduced.
- `Graphql` query language for API
- some others: oop/dto/repository/intercepter....

