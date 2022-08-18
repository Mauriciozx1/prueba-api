<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{
    protected $user;

    /**
     * Se validara la autentificación.
     * y se establecera el modelo User.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->middleware('auth:sanctum');
        $this->user = $user;
    }

    /**
     * Se envia la coleccion de usuarios ordenados y compaginados.
     */
    public function index()
    {
        return new UserResource($this->user->OrderByName()->paginate(4));
    }

    /**
     * Se validan los datos de entrada.
     * Se almacena el nuevo usuario.
     * Retorna colección.
     */

    public function store(UserRequest $request)
    {
        $validate = $request->validated();
        $user = $this->user->create(
            array_merge(
                $request->all(),
                ['password' => Hash::make($request['password'])]
            )
        );

        return new UserResource($this->user->OrderByName()->paginate(4));
    }

    /**
     * Se validan los datos de entrada.
     * Se actualiza el nuevo usuario.
     * Retorna colección.
     */

    public function update(UserRequest $request, $id)
    {
        $validate = $request->validated();
        if (!empty($request->password)) {
            $request->merge(['password' => Hash::make($request['password'])]);
        }
        $user = $this->user->findOrFail($id)->update($request->all());
        return new UserResource($this->user->OrderByName()->paginate(4));
    }
    
    /**
     * Se valida la existencia del usuario.
     * Se elimina el usuario (deleted_at).
     * Retorna colección.
     */
    public function destroy($id)
    {
        $user = $this->user->findOrFail($id);
        $user->delete();
        return new UserResource($this->user->OrderByName()->paginate(4));
    }
}
